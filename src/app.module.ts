import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';

// Database
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../ormconfig';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

import { APP_PIPE } from '@nestjs/core';

import { ConfigModule, ConfigService } from '@nestjs/config';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot(ormconfig),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: 'sqlite',
    //       database: config.get<string>('DB_NAME'), // get a name of db file to used
    //       entities: [User, Report],
    //       synchronize: true // Only for development, realize a migration of your db automaticly
    //     }
    //   }
    // }),
    UsersModule,
    ReportsModule
  ],
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
  constructor(
    private configService: ConfigService
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(cookieSession({
      keys: [this.configService.get('COOKIE_KEY')]
    }))
    .forRoutes('*') // apply this middleware in full app
  }
}