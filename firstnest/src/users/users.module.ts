import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service.js';
import { Users } from './entities/user.js';
import { Products } from '../products/entities/product.entity.js';
import { UsersController } from './users.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Products])], 
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController], 
})
export class UsersModule {}
