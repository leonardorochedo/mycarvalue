import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

// Providers
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

// Database
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService]
})
export class UsersModule {}
