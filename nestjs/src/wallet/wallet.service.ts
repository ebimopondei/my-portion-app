import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Wallet } from 'src/database/models/Wallet';

@Injectable()
export class WalletService {
    constructor( private readonly sequelize: Sequelize ) {}

    async getWalletBalance(user_id: string ) {
        const wallet = await Wallet.findOrCreate({ where: { user_id } });

        return {
            success: true,
            data: wallet[0],
            message: "Wallet balance retrieved successfully"
        };
    }    
}
