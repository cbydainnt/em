import { Injectable, Req } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { JwtAuthService } from './jwt-auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private auth: JwtAuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // để cho phép truy cập req trong callback
      passReqToCallback: true,
      scope: ['email', 'profile'],
      callbackURL: '', // sẽ gán động bên dưới
    });
  }

  /**
   * Ghi đè authenticate() để gán callbackURL động mỗi lần request
   */
  async authenticate(req: any, options?: any): Promise<void> {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.get('host');

    // Tự động tạo callback URL dựa trên domain thực tế
    const origin = `${protocol}://${host}`;
    (this as any)._callbackURL = `${origin}/api/google/callback`;

    // Gọi lại authenticate gốc của Passport
    super.authenticate(req, options);
  }

  async validate(@Req() req: any, accessToken: string, refreshToken: string, profile: any, done: (err: any, user?: any) => void) {
    const origin = `${req.protocol}://${req.get('host')}`;
    console.log('Origin:', origin);

    const primaryEmail = profile.emails?.[0]?.value;
    const user = await this.auth.validateGoogle({
      id: profile.id,
      email: primaryEmail!,
      name: profile.displayName,
      avatar: profile.photos?.[0]?.value,
    });

    done(null, user);
  }
}
