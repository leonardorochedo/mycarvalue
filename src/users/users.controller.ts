import { Body, Controller, Post, Get, Patch, Delete, Param, Query } from '@nestjs/common';

// Service
import { UsersService } from './users.service';

// Dto's
import { CreateUserDto } from './dtos/create-user.dto';
import { EditUserDto } from './dtos/edit-user.dto';

@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post('/singup')
    createUser(@Body() body: CreateUserDto) {
        return this.userService.create(body.email, body.password);
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
