import { Request, Response } from "express";
import { productSchema } from '../../../shared/validation/product-schema'
import Product from "../../database/models/Product";
import { cloudinary, cloudinaryUploadFolder } from "../../config/cloudinary";
import fs  from 'fs'


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
     console.log(req.body.name)
     console.log(req.body.location)
     
     const validated = productSchema.parse(req.body)
     const image_url_path = req?.file?.path;

     if(!image_url_path) {
          res.status(400).json( { success: false, message: 'No file uploaded'})
          return 
     }

     const result = await cloudinary.uploader.upload(image_url_path, { folder: cloudinaryUploadFolder })
     const image_url = cloudinary.url(result.secure_url)


     const product = await Product.create( {
          seller_id: user.id,
          name: validated.name,
          status: validated.status,
          description: validated.description,
          image_url,
          total_quantity: validated.total_quantity,
          quantity_unit: validated.quantity_unit,
          portion_size: validated.portion_size,
          price_per_portion: validated.price_per_portion,
          available_portions: validated.available_portions,
          location: validated.location
     })

     if (fs.existsSync(image_url_path)) {
          fs.unlinkSync(image_url_path);
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
          total_quantity: validated.total_quantity,
          quantity_unit: validated.quantity_unit,
          portion_size: validated.portion_size,
          price_per_portion: validated.price_per_portion,
          available_portions: validated.available_portions,
          location: validated.location
     },

     {
          where: {
               id: user.id
          }
     }
)



}

export {
     getProductById,
     getProductByFilter,
     addNewProduct,
     updateProductById
}