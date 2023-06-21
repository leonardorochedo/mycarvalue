import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';

// Database
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

import { APP_PIPE } from '@nestjs/core';

const cookieSession = require('cookie-session');

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User, Report],
    synchronize: true // Only for development, realize a migration of your db automaticly
  }), UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE, // Apply to all requests from this application
      useValue: new ValidationPipe({ // To create DTO's
        whitelist: true,
      })
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(cookieSession({ keys: ['asdfasdf'] }))
    .forRoutes('*') // apply this middleware in full app
  }
}