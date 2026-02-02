/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { request, Request, Response } from 'express';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class JwtAuthController {
  constructor(
    private configService: ConfigService,
    private jwtAuthService: JwtAuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async jwtAuth(@Req() req: Request, @Res() res: Response) {
    const { password, email, autoLogin } = req.body;
    const user = await this.jwtAuthService.signIn(email, password, 'user');
    // ❗ Chặn login nếu chưa verify
    if (user && (user as any).error === 'NOT_VERIFIED') {
      return res.status(HttpStatus.OK).send({
        status: 'error',
        error: 'NOT_VERIFIED',
        message: 'Vui lòng xác thực email trước khi đăng nhập',
      });
    }

    if (user) {
      const { accessToken } = this.jwtAuthService.login(user, autoLogin);
      res.cookie(this.configService.get('SESSION_COOKIE_KEY'), accessToken, {
        httpOnly: true,
        sameSite: 'lax',
      });
      return res.status(HttpStatus.OK).send({
        status: 'ok',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          type: user.type,
        },
      });
    }

    return res.status(HttpStatus.OK).send({ status: 'error' });
  }

  @Post('admin/login')
  @HttpCode(HttpStatus.OK)
  async jwtAuthAdmin(@Req() req: Request, @Res() res: Response) {
    const { password, email, autoLogin } = req.body;
    const user = await this.jwtAuthService.signIn(email, password, 'admin');
    if (user) {
      const { accessToken } = this.jwtAuthService.loginAdmin(user, autoLogin);
      res.cookie(this.configService.get('SESSION_COOKIE_KEY_ADMIN'), accessToken, {
        httpOnly: true,
        sameSite: 'lax',
      });
      return res.status(HttpStatus.OK).send({
        status: 'ok',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          type: user.type,
        },
      });
    }

    return res.status(HttpStatus.OK).send({ status: 'error' });
  }
  // Redirect sang Google
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {}

  // Google gọi về URL này
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: any, @Res() res: Response) {
    console.log('google/callback', req.user.email); //User from database
    const token = this.jwtAuthService.sign(req.user);
    // 🧠 Lấy domain hiện tại (không cần .env)
    // const host = req.headers.host?.split(':')[0]; // bỏ port
    // const domain = host === 'localhost' ? 'localhost' : `.${host.replace(/^www\./, '')}`;

    res.cookie(this.configService.get('SESSION_COOKIE_KEY'), token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: req.protocol === 'https',
      // domain, // 🔥 gán tự động
      maxAge: 7 * 24 * 3600 * 1000,
    });

    // Chọn nơi điều hướng sau khi login (frontend mặc định)
    const frontendOrigin = this.configService.get('FRONTEND_URL') || 'http://localhost:5173';
    const needUpdateProfile = !req.user.phone || !req.user.address;

    // Lấy redirect_uri nếu cần sau này
    const html = `
      <html>
        <body>
          <script>
            window.opener.postMessage(
              { access_token: "${token}" , needUpdateProfile: ${needUpdateProfile} },
              "${frontendOrigin}"
            );
            window.close();
          </script>
        </body>
      </html>
    `;
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  me(@Req() req: any) {
    return req.user;
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie(this.configService.get('SESSION_COOKIE_KEY'));
    return res.send({ ok: true });
  }
}
