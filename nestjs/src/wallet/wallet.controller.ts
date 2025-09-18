import { Controller, Get } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ParsedToken } from 'decorators';
import { User } from 'src/database/models/User';

@Controller("/v1/wallet")
export class WalletController {

    constructor(private readonly walletService: WalletService) {}

    @Get()
    getWallet(@ParsedToken() user: User) {
        return this.walletService.getWalletBalance(user.id);
    }
}
