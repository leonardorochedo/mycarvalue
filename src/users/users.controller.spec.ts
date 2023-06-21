import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>; // partial beacuse i not implement all methods usersservice provide
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findAll: () => {
        const users = [];

        users.push({ id: 1, email: 'asdf@asdf.com', password: 'asdf' } as User);

        return Promise.resolve(users);
      },
      findOne: (id: number) => {
        return Promise.resolve({ id, email: 'asdf@asdf.com', password: 'asdf' } as User);
      },
      findEmail: (email: string) => {
        const users = [];

        users.push({ id: 1, email, password: 'asdf' } as User);

        return Promise.resolve(users);
      },
      // deleteUser: () => {},
      // editUser: () => {},
    };
    fakeAuthService = {
      // signup: () => {},
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // user tests
  it('findAllUsers returns a list of users with an email', async () => {
    const users = await controller.findAllUsers();

    expect(users).toBeDefined();
  });

  it('findUser returns a single user with the given id', async () => {
    const user = await controller.findUser('1');

    expect(user).toBeDefined();
  });

  it('signin updates session object and returns user', async () => {
    const session = { userId: -10 };
    const user = await controller.signin(
      { email: 'asdf@asdf.com', password: 'asdf' },
      session
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  })
});
