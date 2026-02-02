import { Module } from '@nestjs/common';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule, JwtAuthModule],
})
export class LoginModule {}
