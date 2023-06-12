import { Injectable } from '@nestjs/common';

// TypeORM | Repository
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repository: Repository<User>) {} // Repository is defined automaticly from TypeORM

    create(email: string, password: string) {
        const user = this.repository.create({ email, password }) // Create a instance of User

        return this.repository.save(user); // Save a isntance of this User in Database
    }
    
}