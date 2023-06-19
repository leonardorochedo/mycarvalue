import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { UsersService } from "./users.service";
import { User } from "./user.entity";

// title test file
describe('AuthService', () => {
    let service: AuthService; // describe scope

    // befora all tests
    beforeEach(async () => {
        // craete a fake copy of the users service
        const fakeUsersService: Partial<UsersService> = {
            findAll: () => Promise.resolve([]),
            create: (email: string, password: string) =>
                Promise.resolve({ id: 1, email, password } as User) // trat this how user
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
})
