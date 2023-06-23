import { Controller, Post, Body, UseGuards } from '@nestjs/common';

// Service
import { ReportsService } from './reports.service';

// Dto's
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';

// Guard's
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';

// Serialize
import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('reports')
@Serialize(ReportDto)
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    @Post('/create')
    @UseGuards(AuthGuard) // user should be logged
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.create(body, user);
    }
}
