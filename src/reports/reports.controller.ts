import {
    Controller,
    Post,
    Patch,
    Get,
    Body,
    Param,
    Query,
    UseGuards
} from '@nestjs/common';

import { User } from '../users/user.entity';

// Decorators
import { CurrentUser } from '../users/decorators/current-user.decorator';

// Services
import { ReportsService } from './reports.service';

// Dto's
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';

// Guard's
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

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

    @Patch('/:id')
    @UseGuards(AdminGuard) // only admin user can access
    approvedReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
        return this.reportsService.changeApproval(parseInt(id), body.approved);
    }

    @Get('/estimate')
    getEstimate(@Query() query: GetEstimateDto) {
        return this.reportsService.createEstimate(query);
    }
}
