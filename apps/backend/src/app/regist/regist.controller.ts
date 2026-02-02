import { Body, Controller, HttpCode, HttpStatus, Post, Get, Query } from '@nestjs/common';
import { RegistService, RegisterDto } from './regist.service';

@Controller('regist')
export class RegistController {
  constructor(private readonly registService: RegistService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  async register(@Body() dto: RegisterDto) {
    try {
      const result = await this.registService.registerUser(dto);
      return result;
    } catch (error) {
      console.error('Register error:', error);
      return { status: 'error', message: 'Có lỗi xảy ra. Vui lòng thử lại.' };
    }
  }
  @Get('verify')
  async verify(@Query('token') token: string) {
    return this.registService.verifyEmail(token);
  }
  @Post('resend-verify')
  async resendVerify(@Body('email') email: string) {
    return this.registService.resendVerifyEmail(email);
  }
  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.registService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; password: string }) {
    return this.registService.resetPassword(body.token, body.password);
  }
}
