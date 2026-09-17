import { Module, type MiddlewareConsumer, type NestModule  } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { LoggerMiddleware } from './app.service.js';
import { NamesModule } from './names/names.module.js';
import { PostgresDataSource } from './data-source.js'

@Module({
 imports: [
    TypeOrmModule.forRoot(PostgresDataSource.options),
    NamesModule,
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
