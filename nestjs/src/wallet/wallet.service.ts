import { Injectable } from '@nestjs/common';
import { Wallet } from 'src/database/models/Wallet';

@Injectable()
export class WalletService {

    async getWalletBalance(user_id: string ) {
        const wallet = await Wallet.findOrCreate({ where: { user_id } });

        return {
            success: true,
            data: wallet[0],
            message: "Wallet balance retrieved successfully"
        };
    }    
}
