import Order from "../../database/models/Order";
import { Request, Response } from "express";

const getOrderById = async (req: Request, res: Response) => {
    
}

const getAllUserOrders = async (req: Request, res: Response) => {

    
    const { limit=10, page=1 } = req.query
    
    // @ts-expect-error
    const user = req.parsedToken;

    const orderCount = await Order.count()
    const start = ( Number(page) -1 ) * Number(limit);

    const orders = await Order.findAll( {

        where: {
            user_id: user.id
        },
        order: [ ["createdAt", "DESC"]],
        offset: Number(start), limit: Number(limit)
    })


    const totalPages = Math.ceil(orderCount/Number(limit));

     res.status(200).json({
          success: true,
          data: { totalPages, orderCount, orders },
          message: "Products found!"
     })
    

    
}
const getAllOrders = async (req: Request, res: Response) => {

    
    const { limit=10, page=1 } = req.query
    
    // @ts-expect-error
    const user = req.parsedToken;

    const orderCount = await Order.count()
    const start = ( Number(page) -1 ) * Number(limit);

    const orders = await Order.findAll( {

        where: {
            user_id: user.id
        },
        order: [ ["createdAt", "DESC"]],
        offset: Number(start), limit: Number(limit)
    })


    const totalPages = Math.ceil(orderCount/Number(limit));

     res.status(200).json({
          success: true,
          data: { totalPages, orderCount, orders },
          message: "Products found!"
     })
    

    
}

const addNewOrder = async (req: Request, res: Response) => {

}



export {
    getOrderById,
    addNewOrder,
    getAllOrders,
    getAllUserOrders
}