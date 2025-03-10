import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  validateUser(accessToken: string, refreshToken: string, profile: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
