import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { getSequelizeConfig } from './database/setup';
import { LoggerService } from './logger/logger.service';
import { ProductModule } from './product/product.module';
import { LoggerMiddleware, VerifyJwtMiddleware } from '../middleware';
import { ProductController } from './product/product.controller';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';
import { VendorModule } from './vendor/vendor.module';
import { VendorController } from './vendor/vendor.controller';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    
    SequelizeModule.forRootAsync( {
      useFactory: getSequelizeConfig,
      inject: [ConfigService],
    }),
    
    ProductModule,
    
    CloudinaryModule,
    
    UserModule,
    
    OrderModule,
    
    VendorModule
  ],
  providers: [LoggerService, OrderService],
  controllers: [OrderController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyJwtMiddleware)
      .exclude( { path: 'v1/product/all', method: RequestMethod.GET }) // Exclude specific route from VerifyJwtMiddleware
      .forRoutes(ProductController, VendorController, OrderController, UserController);
    consumer
    .apply(LoggerMiddleware)
    .forRoutes(UserController, VendorController, OrderController, ProductController);

  }
}
