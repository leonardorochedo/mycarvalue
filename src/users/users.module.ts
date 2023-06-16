import { Module } from '@nestjs/common';

import { APP_INTERCEPTOR } from '@nestjs/core';

// Controllers
import { UsersController } from './users.controller';

// Providers
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor'; // Interceptor

// Database
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    { // Global scope to this interceptor
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
    }
  ]
})
export class UsersModule {}
