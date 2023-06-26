import { Injectable, NotFoundException } from '@nestjs/common';

// TypeORM | Repository
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';

// Dto's
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repository: Repository<Report>) {}

    create(reportDto: CreateReportDto, user: User) {
        const report = this.repository.create(reportDto);

        report.user = user;

        return this.repository.save(report);
    }

    async changeApproval(id: number, approved: boolean) {
        const report = await this.repository.findOne({ where: { id } });

        if (!report) {
            throw new NotFoundException('Report not found');
        }

        report.approved = approved;

        return this.repository.save(report);
    }
}
