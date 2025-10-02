import { Controller, Get, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { User } from 'src/database/models/User';
import { ParsedToken } from 'decorators';

@Controller('/v1/transaction')
export class TransactionController {

    constructor( private readonly transaction: TransactionService ) {}

    @Get()
    handleGetTransactions(
        @ParsedToken() user: User,
        @Query("limit") limit: number = 10,
        @Query("page") page: number = 1
    ) {

        return this.transaction.getUserTransactions(user.id, limit, page)

    }
}
