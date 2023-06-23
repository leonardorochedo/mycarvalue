import { Controller, Post, Body, UseGuards } from '@nestjs/common';

// Service
import { ReportsService } from './reports.service';

// Dto's
import { CreateReportDto } from './dtos/create-report.dto';

// Guard's
import { AuthGuard } from '../guards/auth.guard';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    @Post('/create')
    @UseGuards(AuthGuard) // user should be logged
    createReport(@Body() body: CreateReportDto) {
        return this.reportsService.create(body);
    }
}
