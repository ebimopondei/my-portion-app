import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { OrderService } from 'src/order/order.service';

@Module({
  imports: [CloudinaryModule],
  providers: [VendorService, OrderService],
  controllers: [VendorController]
})
export class VendorModule {}
