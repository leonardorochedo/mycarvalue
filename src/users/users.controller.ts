import {
    Body,
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Param,
    Session,
} from '@nestjs/common';

// Entities
import { User } from './user.entity';

// Services
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

// Dto's
import { CreateUserDto } from './dtos/create-user.dto';
import { EditUserDto } from './dtos/edit-user.dto';
import { UserDto } from './dtos/user.dto';

// Interceptor | Decorator Function
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
@Serialize(UserDto) // Intercept Decorator
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {} // DI

    @Get('/whoiam')
    whoIAm(@CurrentUser() user: User) {
        return user;
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.singup(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signout')
    signout(@Session() session: any) {
        session.userId = null;
    }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.userService.findOne(parseInt(id));
    }

    @Get()
    findAllUsers() {
        return this.userService.findAll();
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(parseInt(id));
    }

    @Patch('/:id')
    editUser(@Param('id') id: string, @Body() body: EditUserDto) {
        return this.userService.editUser(parseInt(id), body);
    }
}
