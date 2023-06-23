import { Controller, Post, Body, UseGuards } from '@nestjs/common';

// Service
import { ReportsService } from './reports.service';

// Dto's
import { CreateReportDto } from './dtos/create-report.dto';

// Guard's
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    @Post('/create')
    @UseGuards(AuthGuard) // user should be logged
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.create(body, user);
    }
}
