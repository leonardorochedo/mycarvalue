import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({
        message: 'The user email should be not empty!'
    })
    @IsString({
        message: 'The user email should be a string!'
    })
    email: string;

    @IsNotEmpty({
        message: 'The user password should be not empty!'
    })
    @IsString({
        message: 'The user password should be a string!'
    })
    password: string;
}