import OrderRecord from "../../database/models/order-record";
import Order from "../../database/models/Order";
import { Request, Response } from "express";
import Product from "../../database/models/Product";

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

const markAsPaid = async (req: Request, res: Response) => {

    const orderRecordId = req.params.id

    const updatedOrderRecord = await OrderRecord.update( 
        {
            status: 'pending',
        },
        {
            where: {
                id: orderRecordId,
                // status: 'pending'
            }
        }
    )


    const orderRecord = await OrderRecord.findOne( {
        where: {
            id: orderRecordId,
            // status: 'pending'
        }
    })

    // const orders = orderRecord
    // const orders = ["aeb489ef-4cdb-4a54-9507-7755d40c1af0", "9a0da487-999f-4068-9720-cdec97af20b8"]

    for( const orderRecordProductId of orderRecord?.product_id || [] ){


        await Order.update({ 
            status: "delivered"
        }, {
            where: {
                product_id: orderRecordProductId
            }
        })

        const order = await Order.findOne( {
            where: {
                
                order_record_id: orderRecordId,
                product_id: orderRecordProductId
            }
        })


        const prevOrder = await Product.findOne({ where: { id: order?.product_id}})



        const p = await Product.decrement( "available_portions",
            {
                by: order?.portion,
                where: {
                    id: order?.product_id
                }
            }
        )

        console.log('product')
        console.log(p)
        console.log('product')



    }
    // console.log(orderRecord)
    // console.log(orders)

    res.status(200).json({
        success: true,
        data: {
            orderRecordId,
            // orders,
            // record,
            // orderRecord,
            updatedOrderRecord
        },
        message: "Order updated"
    
    })



}



export {
    getOrderById,
    markAsPaid,
    addNewOrder,
    getAllOrders,
    getAllUserOrders
}