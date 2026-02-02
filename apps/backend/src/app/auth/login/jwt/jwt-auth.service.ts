import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { JwtPayload } from './jwt-auth.strategy';
import { User } from '@prisma/client';
import { UserService } from '@/app/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  login(user: User, autoLogin: boolean) {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      type: user.type,
    };
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: autoLogin ? '365d' : '1d',
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
    };
  }

  loginAdmin(user: User, autoLogin: boolean) {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      type: user.type,
    };
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: autoLogin ? '365d' : '1d',
        secret: this.configService.get<string>('JWT_ADMIN_SECRET'),
      }),
    };
  }

  async signIn(email: string, password: string, type: string): Promise<any> {
    const user = await this.userService.findOneEmail({ email, type });

    // ❗ Trường hợp không tìm thấy user
    if (!user) {
      return null;
    }

    // ❗ Check verify trước khi so sánh mật khẩu
    if (user.verified === false) {
      return { error: 'NOT_VERIFIED' };
    }

    // ❗ So sánh mật khẩu
    if (user.password) {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return null;
      }
    }

    return user;
  }

  //For google login
  async validateGoogle(profile: { id: string; email: string; name?: string; avatar?: string }) {
    console.log('validateGoogle');
    const user = await this.userService.upsertGoogleUser({
      googleId: profile.id,
      email: profile.email,
      name: profile.name,
      avatar: profile.avatar,
    });
    return user;
  }

  sign(user: { id: string; email: string; role?: any }) {
    console.log('Google sign/login');
    return this.jwtService.sign({ sub: user.id, email: user.email, type: user.role });
  }
}
