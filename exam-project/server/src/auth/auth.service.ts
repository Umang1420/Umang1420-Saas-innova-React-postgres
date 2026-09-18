import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service.js';
import bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  
  async signIn(username: string, pass: string): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.usersService.findOne(username);

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(pass, user.passwordHash);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { accessToken, refreshToken } = await this.generateTokens(user.id, user.username, user.role);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshTokens(userId: number, providedRefreshToken: string): Promise<{ access_token: string; refresh_token: string }> {

    const user = await this.usersService.findById(userId);
    
    if(!user){
      throw new UnauthorizedException("invalid user")
    }
    const oldrefresh = localStorage.getItem('refresh');

    if (!user || !oldrefresh || oldrefresh !== providedRefreshToken) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    } 
    const { accessToken, refreshToken } = await this.generateTokens(user.id, user.username, user.role);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private async generateTokens(userId: number, name: string, role: string) {
    const payload = { sub: userId, username: name, roles: [role] };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}   