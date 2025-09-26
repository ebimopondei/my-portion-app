import { Module } from '@nestjs/common';
import { AdminOrderController, OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController, AdminOrderController],
  providers: [OrderService]
})
export class OrderModule {}
