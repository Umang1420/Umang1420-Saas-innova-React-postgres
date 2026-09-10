import { AuthGuard } from './auth.guard.js';
import { Body, Controller, Post, Get, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  
  @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Body() body: { userId: number; refreshToken: string }) {
      return this.authService.refreshTokens(body.userId, body.refreshToken);
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
