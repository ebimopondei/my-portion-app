import { Request, Response } from "express";
import { checkOutSchema } from '../../../shared/validation/check-out-schema'
import Product from "../../database/models/Product";
import { cloudinary, cloudinaryUploadFolder } from "../../config/cloudinary";
import fs  from 'fs'
import { Status } from "../../../shared/enums";
import z from "zod";
import OrderRecord from "../../database/models/order-record";
import { sequelize } from "../../database/setup";
import Order from "../../database/models/Order";

const productSchema = z.object( {
    seller_id: z.string().optional(),
    name: z.string(),
    category: z.string(),
    status: z.enum([Status.Pending, Status.Delivered, Status.Cancelled]).optional(),
    description: z.string().optional(),
    image_url: z.file('Select Image file').optional(),
    video_url: z.file('Select Video file').optional(),
    total_quantity: z.string(),
    quantity_unit: z.string(),
    number_per_portion: z.string(),
    portion_size: z.string().min(1, 'Must be atleast 1').optional(),
    price_per_portion: z.string().optional(),
    available_portions: z.string().optional(),
    location: z.string().optional()
})


const CartItemSchema = z.object({
     id: z.string().uuid(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  unit: z.string(),
  vendor_id: z.string(),
  quantity: z.number(),
});

const AddressAndCartSchema = z.object({
     street_address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  delivery_note: z.string().optional(),
  cartItems: z.array(CartItemSchema),
});


const getProduct = async (req: Request, res: Response) => {
     
     const whereClause: Partial<Product> = {};
     
     const { state, limit=10, page=1 } = req.query;
     // @ts-expect-error
     const user = req.parsedToken;

     if (state) {
          whereClause.location = state.toString().toLocaleLowerCase();
     }

     const productCount = await Product.count( { paranoid: true });
     const start =  ( Number(page) -1 ) * Number(limit);

     const product = await Product.findAll(
          {
               where: {
                    ...whereClause, seller_id: user.id
               },
               order: [ ["createdAt", "DESC"]],
               offset: Number(start), limit: Number(limit)
          }
     )
     const totalPages = Math.ceil(productCount/Number(limit));

     res.status(200).json({
          success: true,
          data: { totalPages, productCount, product },
          message: "Products found!"
     })
     
    
}
const getProductByFilter = async (req: Request, res: Response) => {
     
     const whereClause: Partial<Product> = {};
     
     const { state, limit=10, page=1 } = req.query;

     if (state) {
          whereClause.location = state.toString().toLocaleLowerCase();
     }

     const productCount = await Product.count( { paranoid: true });
     const start =  ( Number(page) -1 ) * Number(limit);

     const product = await Product.findAll(
          {
               where: whereClause,
               order: [ ["createdAt", "DESC"]],
               offset: Number(start), limit: Number(limit)
          }
     )
     const totalPages = Math.ceil(productCount/Number(limit));

     res.status(200).json({
          success: true,
          data: { totalPages, productCount, product },
          message: "Products found!"
     })
     
    
}

const getProductById = async (req: Request, res: Response) => {

}

const addNewProduct = async (req: Request, res: Response) => {

     // @ts-expect-error
     const user = req.parsedToken
     
     const validated = productSchema.parse(req.body)
     // @ts-expect-error
     const image_url_path = req?.files['image_url'][0].path
     // @ts-expect-error
     const video_url_path = req?.files['video_url'][0].path
     // @ts-expect-error
     const gallery_url_path = req?.files['gallery']


     if(!image_url_path) {
          res.status(400).json( { success: false, message: 'No file uploaded'})
          return 
     }

     if(!video_url_path) {
          res.status(400).json( { success: false, message: 'No file uploaded'})
          return 
     }

     let result = await cloudinary.uploader.upload(image_url_path, { folder: cloudinaryUploadFolder })
     const image_url = result.secure_url
     const video_result = await cloudinary.uploader.upload(video_url_path, { resource_type: "video", folder: cloudinaryUploadFolder })
     const video_url = video_result.secure_url


     const product = await Product.create( {
          seller_id: user.id,
          name: validated.name,
          status: Status.Pending,
          number_per_portion: validated.number_per_portion,
     
          description: validated.description || '',
          image_url,
          video_url,
          category: validated.category,
          total_quantity: Number(validated.total_quantity),
          quantity_unit: validated.quantity_unit,
          portion_size: Number(validated.portion_size),
          price_per_portion: Number(validated.price_per_portion),
          available_portions: Number(validated.total_quantity)/Number(validated.portion_size),
          location: validated.location || ''
     })

     if (fs.existsSync(image_url_path)) {
          fs.unlinkSync(image_url_path);
     }
     if (fs.existsSync(video_url_path)) {
          fs.unlinkSync(video_url_path);
     }

     res.status(201).json({
          success: true,
          data: product,
          message: `Product id: ${product.id} created successfully!`
     })
}

const updateProductById = async (req: Request, res: Response) => {

     // @ts-expect-error
     const user = req.parsedToken

     const validated = productSchema.parse(req.body)
     const image_url_path = req?.file?.path;

     let image_url;


     if(image_url_path) {
          const result = await cloudinary.uploader.upload(image_url_path, { folder: cloudinaryUploadFolder })
          image_url = cloudinary.url(result.secure_url)
     }

     const product = await Product.update( {
          name: validated.name,
          description: validated.description,
          image_url,
          category: '',
          status: 'pending',
          seller_id: '',
          total_quantity: Number(validated.total_quantity),
          quantity_unit: validated.quantity_unit || '',
          portion_size: Number(validated.portion_size),
          price_per_portion: Number(validated.price_per_portion),
          available_portions: Number(validated.available_portions),
          location: validated.location ||''
     },

     {
          where: {
               id: user.id
          }
     }
)



}

const checkOut = async (req: Request, res: Response ) => {

     const validated = AddressAndCartSchema.parse(req.body)
     // @ts-expect-error
     const user = req.parsedToken;

     const orders: Order[] = [];

     // check if portion is available

     for (const item of validated.cartItems ) {
          const product = await Product.findOne( {
               where: {
                    id: item.id
               }
          })

          if(Number(product?.available_portions) < item.quantity){

               res.status(201).json( {
                    message: `Insufficient portions. Available portions for ${product?.name} is ${product?.available_portions}. Please reduce portion amount from cart.`
               })
               return;
          }
     }

     let orderRecord = {}


     const tx = await sequelize.transaction( async ( t) => {

          const { dataValues} = await OrderRecord.create( {
               product_id: validated.cartItems.map( item => item.id),
               status: "pending",
               order_ids: [],
               user_id: user.id
          }, { transaction: t })

          for ( const item of validated.cartItems ) {
               const order = await Order.create( {
                    amount: String(item.price),
                    portion: item.quantity,
                    order_record_id: String(dataValues.id),
                    product_id: item.id,
                    status: 'pending',
                    user_id: user.id,
               }, { transaction: t })

               await OrderRecord.update( {
                    order_ids: order.id,
               },
               { 
                    where: {
                         id: dataValues.id
                    },
                    transaction: t
               })

               orders.push(order)
          }

          orderRecord = dataValues

     })

     const orderDetails = {...orderRecord, orders}

     res.status(201).json( {
          success: true,
          data: orderDetails,
          message: 'Order created!'
     })
}

export {
     getProductById,
     getProductByFilter,
     addNewProduct,
     updateProductById,
     getProduct,
     checkOut
}