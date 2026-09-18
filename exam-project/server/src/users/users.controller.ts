import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from '../users/user.service.js';
import { Users } from '../users/user.entity.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
  
  @Post()
  async createUser(
    @Body() body: { username?: string; password?: string;}
  ) {

    const userData: Partial<Users> = {
      ...(body.username !== undefined ? { username: body.username } : {}),
      ...(body.password !== undefined ? { passwordHash: body.password } : {})
    };


    return await this.usersService.createUserWithProducts(userData);
  }
}
function findAll() {
  throw new Error('Function not implemented.');
}

