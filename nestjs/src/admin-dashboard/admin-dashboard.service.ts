import { Injectable } from '@nestjs/common';
import { Order } from 'src/database/models/Order';
import { Product } from 'src/database/models/Product';
import { User } from 'src/database/models/User';

@Injectable()
export class AdminDashboardService {

    async getDashboardStats() {
        const user_count = await User.count( { where: { role: 'user' }, paranoid: true})
        const total_user_count = await User.count( { where: { role: 'user' }, paranoid: false})
        const vendor_count = await User.count( { where: { role: 'vendor' }, paranoid: true})
        const total_vendor_count = await User.count( { where: { role: 'vendor' }, paranoid: false})
        const total_product_count = await Product.count( )
        const total_order_count = await Order.count( )

        const data = {
            user_count,
            total_user_count,
            vendor_count,
            total_vendor_count,
            total_product_count,
            total_order_count,
        }

        return {
            success: true,
            data,
            message: "Products found!"
        };
    
    }


}
