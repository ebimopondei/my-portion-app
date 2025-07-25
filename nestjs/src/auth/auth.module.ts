import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../database/models/User';
import { Product } from 'src/database/models/Product';
import { Order } from 'src/database/models/Order';
import { Wallet } from 'src/database/models/Wallet';
import { Bank } from 'src/database/models/Bank';
import { KycBusiness } from 'src/database/models/KycBusiness';
import { KycBusinessDocs } from 'src/database/models/KycBusinessDocs';
import { KycIdVerification } from 'src/database/models/KycIdVerification';
import { KycPersonal } from 'src/database/models/KycPersonal';
import { OrderRecord } from 'src/database/models/order-record';
import { Rating } from 'src/database/models/Rating';
import { SellerKyc } from 'src/database/models/SellerKYC';

@Module({
  imports: [SequelizeModule.forFeature([Bank, KycBusiness, KycBusinessDocs, KycIdVerification, KycPersonal, OrderRecord, Order, Product, Rating, SellerKyc, User, Wallet  ])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
