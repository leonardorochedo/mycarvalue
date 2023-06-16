import {
    Body,
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Param,
    Query,
    Session
} from '@nestjs/common';

// Services
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

// Dto's
import { CreateUserDto } from './dtos/create-user.dto';
import { EditUserDto } from './dtos/edit-user.dto';
import { UserDto } from './dtos/user.dto';

// Interceptor | Decorator Function
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('auth')
@Serialize(UserDto) // Intercept Decorator
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {} // DI

    @Get('/whoiam')
    whoAmI(@Session() session: any) {
        return this.userService.findOne(session.userId);
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
    findAllUsers(@Query('email') email: string) {
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
