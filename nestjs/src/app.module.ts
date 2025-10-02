import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { getSequelizeConfig } from './database/setup';
import { LoggerService } from './logger/logger.service';
import { ProductModule } from './product/product.module';
import { LoggerMiddleware } from '../middleware';
import { ProductController } from './product/product.controller';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';
import { VendorModule } from './vendor/vendor.module';
import { VendorController } from './vendor/vendor.controller';
import { MailerModule } from './mailer/mailer.module';
import { WalletModule } from './wallet/wallet.module';
import { AdminDashboardService } from './admin-dashboard/admin-dashboard.service';
import { AdminDashboardController } from './admin-dashboard/admin-dashboard.controller';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync( 
      { useFactory: getSequelizeConfig, inject: [ConfigService] }
    ),
    ProductModule,
    CloudinaryModule,
    UserModule,
    OrderModule,
    VendorModule,
    MailerModule,
    WalletModule,
    AdminDashboardModule
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    LoggerService, AdminDashboardService],
  controllers: [AdminDashboardController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes(UserController, VendorController, OrderController, ProductController);

  }
}
