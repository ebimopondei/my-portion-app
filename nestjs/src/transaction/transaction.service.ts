import { Injectable } from '@nestjs/common';
import { Transaction } from 'src/database/models/Transaction';

@Injectable()
export class TransactionService {

    async getUserTransactions(user_id:string, limit: number, page: number) {
        const offset = (Number(page) - 1) * Number(limit);

        const transactions = await Transaction.findAll( {
            where: {
                user_id
            },
            offset,
            limit: Number(limit),
            
        })

        return transactions
    }
}
