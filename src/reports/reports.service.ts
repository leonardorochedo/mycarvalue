import { Injectable } from '@nestjs/common';

// TypeORM | Repository
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';

// Dto's
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repository: Repository<Report>) {}

    create(reportDto: CreateReportDto) {
        const report = this.repository.create(reportDto);

        return this.repository.save(report);
    }
}
