import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module.js';
import { jwtConstants } from './constants.js';

@Module({
  imports : [ 
      UsersModule, 
      JwtModule.register({
      global: true,
      secret: jwtConstants.secret
    })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
