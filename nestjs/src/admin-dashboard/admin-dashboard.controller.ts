import { Controller, Get } from '@nestjs/common';
import { AdminDashboardService } from './admin-dashboard.service';

@Controller('v1/admin')
export class AdminDashboardController {
    constructor(private readonly adminService: AdminDashboardService) {}
    
    @Get("stats")
    getStats(){
        return this.adminService.getDashboardStats();  
    }
}
