import { Request, Response } from "express";
import { productSchema } from '../../../shared/validation/product-schema'
import Product from "../../database/models/Product";


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
     
     const validated = productSchema.parse(req.body)

     const product = await Product.create( {
          seller_id: validated.seller_id,
          name: validated.name,
          description: validated.description,
          image_url: validated.image_url,
          total_quantity: validated.total_quantity,
          quantity_unit: validated.quantity_unit,
          portion_size: validated.portion_size,
          price_per_portion: validated.price_per_portion,
          available_portions: validated.available_portions,
          location: validated.location
     })

     res.status(201).json({
          success: true,
          data: product,
          message: `Product id: ${product.id} created successfully!`
     })
}

const updateProductById = async (req: Request, res: Response) => {

}

export {
     getProductById,
     getProductByFilter,
     addNewProduct,
     updateProductById
}