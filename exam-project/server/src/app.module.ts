import { Module, type MiddlewareConsumer, type NestModule  } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { LoggerMiddleware } from './app.service.js';
import { NamesModule } from './names/names.module.js';
import { PostgresDataSource } from './data-source.js';
import { Name } from './names/entities/name.entity.js';
import { Users } from './users/user.entity.js';
import { AuthModule } from './auth/auth.module.js';
import { MessagesModule } from './messages/messages.module.js';

@Module({
 imports: [
    TypeOrmModule.forRoot(PostgresDataSource.options),
    TypeOrmModule.forFeature([Name, Users]),
    NamesModule,
    AuthModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/');
  }
}
