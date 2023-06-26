import { Module, MiddlewareConsumer } from '@nestjs/common';

// Controllers
import { UsersController } from './users.controller';

// Providers
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

// Middleware
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

// Database
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
  ]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
}
