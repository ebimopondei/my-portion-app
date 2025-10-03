import { Controller, Get, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ParsedToken } from 'decorators';
import { User } from 'src/database/models/User';

@Controller('/v1/notification')
export class NotificationController {
    constructor( private readonly notificationService: NotificationService) {}
    @Get()
    getNotifications(
        @ParsedToken() user: User,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ) {

        return this.notificationService.getNotifications(user.id, limit, page)
    }
}
