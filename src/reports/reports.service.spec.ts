import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';

describe('ReportsService', () => {
  let fakeReportsService: Partial<ReportsService>;

  beforeEach(async () => {
    fakeReportsService = {

    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
            provide: ReportsService,
            useValue: fakeReportsService
        }
      ],
    }).compile();

    fakeReportsService = module.get(ReportsService);
  });

  it('should be defined', () => {
    expect(fakeReportsService).toBeDefined();
  });
});
