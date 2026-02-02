import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './jwt-auth.service';
import { JwtAuthStrategy } from './jwt-auth.strategy';
import { JwtAuthController } from './jwt-auth.controller';
import { UserService } from '@/app/user/user.service';
import { JwtAuthAdminStrategy } from './jwt-auth-admin.strategy';
import { GoogleStrategy } from './google.strategy';
import { UserModule } from '@/app/user/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule, // ❗ Bảo đảm đã import ConfigModule (global hoặc local)
    UserModule,
    PassportModule.register({ session: false }),

    // ⭐ Dùng registerAsync để inject config
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  providers: [JwtAuthStrategy, JwtAuthAdminStrategy, GoogleStrategy, UserService, JwtAuthService],
  exports: [JwtModule, JwtAuthService],
  controllers: [JwtAuthController],
})
export class JwtAuthModule {}
