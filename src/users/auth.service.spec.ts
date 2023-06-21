import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";

// title test file
describe('AuthService', () => {
    let service: AuthService; // describe scope
    let fakeUsersService: Partial<UsersService>;

    // before all tests
    beforeEach(async () => {
        // db of this file
        const users: User[] = [];
        // craete a fake copy of the users service
        fakeUsersService = {
            // define here a methods used in tests down
            findEmail: (email: string) => {
                const filteredUsers = users.filter(user => user.email === email);
                return Promise.resolve(filteredUsers);
            },
            create: (email: string, password: string) => {
                const user = ({ id: Math.floor(Math.random() * 99999), email, password } as User);
                users.push(user);
                return Promise.resolve(user);
            }
        }

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService
                }
            ]
        }).compile();

        service = module.get(AuthService);
    })

    // tests
    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    })

    // signup methods
    it('creates a new user with a salted and hashed password', async () => {
        const user = await service.signup('asdf@asdf.com', 'asdf');

        // make sure this password is hashed
        expect(user.password).not.toEqual('asdf');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    })

    it('throws an error if user signs up with email that is in use', async () => {
        fakeUsersService.findEmail = () => Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);

        await expect(service.signup('asdf@asdf.com', 'asdf'))
        .rejects.toThrow(BadRequestException);
    });

    // signin methods
    it('throws if signin is called with an unused email', async () => {
        await expect(service.signin('asdflkj@asdlfkj.com', 'passdflkj'),)
        .rejects.toThrow(NotFoundException);
    })

    it('throws if an invalid password is provided', async () => {
        fakeUsersService.findEmail = () => Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
        
        await expect(service.signin('laskdjf@alskdfj.com', 'passowrd'),)
        .rejects.toThrow(BadRequestException);
    });

    it('return a user if corret data is provided', async () => {
        await service.signup('asdf@asdf.com', 'mypassword');

        const user = await service.signin('asdf@asdf.com', 'mypassword');

        expect(user).toBeDefined();
    })
})
