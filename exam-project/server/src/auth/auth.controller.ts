import { Body, Controller, Post, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: { username: string; passwordHash: string }) {
    return await this.authService.signIn(signInDto.username, signInDto.passwordHash);
  }
  
  @Post('refresh')
    async refresh(@Body() body: { userId: number; refreshToken: string }) {
      return await this.authService.refreshTokens(body.userId, body.refreshToken);
  }

   @Get('names')
    getProfile(@Request() req: any) {
    return req.user;
  }
}