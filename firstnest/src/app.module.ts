import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductsModule } from './products/products.module.js';
import { Products } from './products/entities/product.entity.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
// import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { Users } from './users/entities/user.js';
import { UsersController } from './users/users.controller.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'Umang#2005',
      database: 'firstdb',
      entities: [Products, Users],
      autoLoadEntities: true,
      synchronize: true
    }),
    // ThrottlerModule.forRoot({
    //   throttlers: [
    //     {
    //       ttl: 60000,
    //       limit: 10,
    //     },
    //   ],
    // }),
    ProductsModule,
    AuthModule, 
    UsersModule, 
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService, 

    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // }
  ],
})
export class AppModule {}
