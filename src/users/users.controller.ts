import {
    Body,
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Param,
    Session,
    UseGuards
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
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto) // Intercept Decorator to break password user in GET requests
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {} // DI

    @Get('/whoiam')
    @UseGuards(AuthGuard) // if user not signin can't acces this route
    whoIAm(@CurrentUser() user: User) {
        return user;
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
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
