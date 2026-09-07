import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { Role } from '../enums/role.enum.js'

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {
    roles: Role[];
}
