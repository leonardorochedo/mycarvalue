import { Injectable, NotFoundException} from '@nestjs/common';

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

    async findOne(id: number) {
        const user = await this.repository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async findAll() {
        const users = await this.repository.find();

        return users;
    }

    async findEmail(email: string) {
        const users = await this.repository.find({ where: { email } });

        return users;
    }

    async editUser(id: number, attrs: Partial<User>) { // attrs: Atributtes with User body
        const user = await this.repository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        Object.assign(user, attrs); // Att object

        return this.repository.save(user); // Save User
    }

    async deleteUser(id: number) {
        const user = await this.repository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.repository.remove(user); // Remove User instance
    }
    
}