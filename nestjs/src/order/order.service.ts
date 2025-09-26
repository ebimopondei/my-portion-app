import { Injectable } from '@nestjs/common';
import { Order } from 'src/database/models/Order';
import { OrderRecord } from 'src/database/models/order-record';
import { Product } from 'src/database/models/Product';
import { User } from 'src/database/models/User';

@Injectable()
export class OrderService {
    async getAllOrders( page: string, limit: string ) {

        const orderCount = await Order.count()
        const start = ( Number(page) -1 ) * Number(limit);

        const orders = await Order.findAll( {
            order: [ ["createdAt", "DESC"]],
            offset: Number(start), limit: Number(limit),
            include: [Product, User]
        })

        const totalPages = Math.ceil(orderCount/Number(limit));

        return {
            success: true,
            data: { totalPages, orderCount, orders },
            message: "Orders found!"
        }

    }

    async getAllUserOrders( user_id: string, page: string, limit: string ) {

        const orderCount = await Order.count()
        const start = ( Number(page) -1 ) * Number(limit);

        const orders = await Order.findAll( {

            where: {
                user_id
            },
            order: [ ["createdAt", "DESC"]],
            offset: Number(start), limit: Number(limit)
        })

        const totalPages = Math.ceil(orderCount/Number(limit));

        return {
            success: true,
            data: { totalPages, orderCount, orders },
            message: "User orders found!"
        }
    }

    async addNewOrder( user_id: string, productId: string, quantity: string ) {
        // Logic to add a new order
        // This is a placeholder implementation
        return {
            success: true,
            message: "New order added successfully",
            data: { user_id, productId, quantity }
        };
    }

    async markAsPaid(orderRecordId: string) {

        const updatedOrderRecord = await OrderRecord.update(
            { status: 'pending' },
            { where: { id: orderRecordId } }
        );

        const orderRecord = await OrderRecord.findOne({
            where: {
                id: orderRecordId,
            }
        });

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

        }

        return {
            success: true,
            data: {
                orderRecordId,
                updatedOrderRecord
            },
            message: "Order updated"
        }

    }

    async getOrderRecord(seller_id: string, page: string, limit: string) {

        const start = ( Number(page) -1 ) * Number(limit);
        
        const products = await Product.findAll({
            where: {
                seller_id
            },
            include: [{ model: Order, include: [User] }],
            order: [ ["createdAt", "DESC"]],
            offset: Number(start), limit: Number(limit)
        });

        return { message: 'Order records retrieved', data: products };
        

    }

    async getProductOrderRecord(seller_id: string, page: string, limit: string) {

        const start = ( Number(page) -1 ) * Number(limit);
        
        const products = await Product.findAll({
            where: {
                seller_id
            },
            include: [{ model: Order, include: [User] }],
            order: [ ["createdAt", "DESC"]],
            offset: Number(start), limit: Number(limit)
        });

        return { message: 'Order records retrieved', data: products };
        

    }


}
