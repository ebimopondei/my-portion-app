import { Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { ParsedToken } from 'decorators';

@Controller('/v1/order')
export class OrderController {

    constructor(private readonly orderService: OrderService) {}

    @Get(':id')
    getOrderById(@ParsedToken() user: { id: string }, @Query('id') id: string) {
        return this.orderService.getAllOrders(user.id, id, '1'); // Assuming '1' is the default page and limit
    }
    
    @Get('all') 
    getAllOrders(@ParsedToken() user: { id: string }, @Query('page') page: string, @Query('limit') limit: string    ) {
        return this.orderService.getAllOrders(user.id, page, limit);
    }

    @Get()
    getAllUserOrders(@ParsedToken() user: { id: string }, @Query('page') page: string, @Query('limit') limit: string) {
        return this.orderService.getAllUserOrders(user.id, page, limit);
    }

    @Post()
    addNewOrder(@ParsedToken() user: { id: string }, @Query('productId') productId: string, @Query('quantity') quantity: string) {
        return this.orderService.addNewOrder(user.id, productId, quantity);
    }

    @Patch('complete-check-out/:id')
    markAsPaid(@Param('id') id: string) {
        return this.orderService.markAsPaid(id);
    }
}
