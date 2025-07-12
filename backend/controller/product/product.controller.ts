import { Request, Response } from "express";
import { productSchema } from '../../../shared/validation/product-schema'
import Product from "../../database/models/Product";


const getProductByLocation = async (req: Request, res: Response) => {
    
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
     getProductByLocation,
     addNewProduct,
     updateProductById
}