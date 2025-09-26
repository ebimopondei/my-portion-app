import { Injectable } from '@nestjs/common';
import { Order } from 'src/database/models/Order';
import { Product } from 'src/database/models/Product';
import { User } from 'src/database/models/User';

@Injectable()
export class AdminDashboardService {

    async getDashboardStats() {
        const [
            active_user_count,
            total_user_count,
            active_vendor_count,
            total_vendor_count,
            total_product_count,
            total_order_count,
            all_users_count, 
            all_vendors_count
        ] = await Promise.all([
            User.count({ where: { role: 'user', email_verified: true }, paranoid: true }),
            User.count({ where: { role: 'user' }, paranoid: false }),
            User.count({ where: { role: 'vendor', kyc_verified: true }, paranoid: true }),
            User.count({ where: { role: 'vendor' }, paranoid: false }),
            Product.count(),
            Order.count(),
            User.count({ where: { role: "user"}}),
            User.count({ where: { role: "vendor"}})
        ]);
        
        return {
            success: true,
            data: {
                active_user_count,
                total_user_count,
                active_vendor_count,
                total_vendor_count,
                total_product_count,
                total_order_count,
                all_users_count, 
                all_vendors_count
            },
            message: "Stats found!"
        };
    
    }


}
