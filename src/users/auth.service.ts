import { BadRequestException, Injectable } from "@nestjs/common";

import { UsersService } from "./users.service";

// to hash password
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

// to cancel callback method
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async singup(email: string, password: string) {
        // See if email is in use
        const users = await this.usersService.findEmail(email);

        if(users.length) {
            throw new BadRequestException('E-mail in use');
        }

        // Hash the users password
        const salt = randomBytes(8).toString('hex');

        const hash = (await scrypt(password, salt, 32)) as Buffer; // 32 characters hashed

        const result = salt + '.' + hash.toString('hex');

        // Create a new user and save it
        const user = await this.usersService.create(email, result);

        // return the user
        return user;
    }

    signin() {

    }
}