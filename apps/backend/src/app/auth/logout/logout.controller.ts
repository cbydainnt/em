/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller()
export class LogoutController {
  constructor(private readonly configService: ConfigService) {}
  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie(this.configService.get('SESSION_COOKIE_KEY'));
    if (req.query && req.query.back === 'true') {
      let redirect = 'login';
      if (req.query && req.query.redirect) {
        redirect = req.query.redirect as string;
      }
      return res.redirect('../' + redirect);
    }
    return res.status(HttpStatus.OK).send({ status: 'ok' });
  }

  @Get('admin/logout')
  async logoutAdmin(@Req() req: Request, @Res() res: Response) {
    res.clearCookie(this.configService.get('SESSION_COOKIE_KEY_ADMIN'));
    if (req.query && req.query.back === 'true') {
      let redirect =
        this.configService.get('NODE_ENV') === 'development'
          ? 'login'
          : 'admin/login';
      if (req.query && req.query.redirect) {
        redirect = req.query.redirect as string;
      }
      return res.redirect('../' + redirect);
    }
    return res.status(HttpStatus.OK).send({ status: 'ok' });
  }
}
