import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise< {access_token : string}> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = {sub : user.id , username : user.userEmail ,roles: [user.role]};

    return {
        access_token : await this.jwtService.signAsync(payload)
    };
  }
}
