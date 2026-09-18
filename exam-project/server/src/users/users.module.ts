import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/user.service.js';
import { Users } from '../users/user.entity.js';
import { Name } from '../names/entities/name.entity.js';
import { UsersController } from '../users/users.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Name])], 
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController], 
})
export class UsersModule {}
