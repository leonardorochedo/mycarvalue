import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {

    }

    const module = await Test.createTestingModule({
      providers: [
          {
              provide: UsersService,
              useValue: fakeUsersService
          }
      ]
    }).compile();

    fakeUsersService = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(fakeUsersService).toBeDefined();
  });
});
