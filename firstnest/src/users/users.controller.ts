import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { Users } from './entities/user.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
  
  @Post()
  async createUser(
    @Body() body: { userEmail?: string; password?: string; refreshToken?: string; productIds?: number[] }
  ) {

    const userData: Partial<Users> = {
      userEmail: body.userEmail,
      password: body.password,
      refreshToken: body.refreshToken,
    };
    const productIds = body.productIds ?? [];


    return await this.usersService.createUserWithProducts(userData, productIds);
  }
}
function findAll() {
  throw new Error('Function not implemented.');
}

