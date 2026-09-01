import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DogsController } from './dogs/dogs.controller.js';
import { CatsModule } from './cats/cats.module.js';
import { ProductsModule } from './products/products.module.js';
import { Products } from './products/entities/product.entity.js';

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
    ProductsModule,
  ],
  controllers: [AppController, DogsController],
  providers: [AppService],
})
export class AppModule {}
