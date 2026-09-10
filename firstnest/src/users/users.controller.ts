import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { Users } from './entities/user.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
