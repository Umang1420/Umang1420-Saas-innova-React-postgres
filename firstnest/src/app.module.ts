import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DogsController } from './dogs/dogs.controller.js';
import { CatsModule } from './cats/cats.module.js';
import { ProductsModule } from './products/products.module.js';
import { Products } from './products/entities/product.entity.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { UsersService } from './users/users.service.js';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    CatsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'Umang#2005',
      database: 'firstdb',
      entities :[Products],
      synchronize : true
    }),
     ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    ProductsModule,
    AuthModule, 
    UsersModule,
  ],
  controllers: [AppController, DogsController],
  providers: [AppService, UsersService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }],
})

export class AppModule {}
