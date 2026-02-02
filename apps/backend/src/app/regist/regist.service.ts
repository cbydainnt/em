import { Injectable, BadRequestException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { UserService } from '@/app/user/user.service';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
const prisma = new PrismaClient({
  errorFormat: 'colorless',
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

export interface RegisterDto {
  name: string;
  email: string;
  phone: string;
  password: string;
}

@Injectable()
export class RegistService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async registerUser(dto: RegisterDto) {
    // Kiểm tra email đã tồn tại chưa
    const existingUser = await this.userService.findOneEmail({ email: dto.email, type: 'user' });
    if (existingUser) {
      return { status: 'error', message: 'Email đã được sử dụng.' };
    }

    // Hash mật khẩu
    const salt = await bcrypt.genSalt(10);
    const password2 = await bcrypt.hash(dto.password, salt);
    // 3. Generate verify token
    const verifyToken = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 15 phút
    // Tạo user mới
    const user = await prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        password: password2,
        type: 'user',
        verified: false,
        verifyToken,
        verifyExpires: expires,
      },
    });

    // 5. Gửi email verify
    await this.sendVerifyEmail(dto.email, verifyToken);

    return {
      status: 'ok',
      message: 'Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản.',
    };
  }
  async sendVerifyEmail(email: string, token: string) {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    const verifyUrl = `${frontendUrl}/xac-thuc-email?token=${token}`;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'thanhnt040201@gmail.com',
        pass: 'azdd kuuw bfpp kupn',
      },
    });

    await transporter.sendMail({
      from: '"English Master" <thanhnt040201@gmail.com>',
      to: email,
      subject: 'Xác thực tài khoản English Master',
      html: `
   <div style="font-family: Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #202124;">
       <!-- <div style="text-align: center; margin-bottom: 30px;">
            <img 
              src="https://localhost:3001/assets/EMLOGOLIGHT.gif" 
              alt="English Master Logo" 
              style="width: 60px; height: 60px; border-radius: 50%;" 
            />
        </div>-->

    <h2 style="text-align: center; color: #202124;">Xác thực tài khoản của bạn</h2>

    <p>Xin chào <strong>${email}</strong>,</p>
    <p>Cảm ơn bạn đã đăng ký tài khoản tại English Master. Vui lòng nhấn vào nút bên dưới để xác thực email của bạn:</p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${verifyUrl}" target="_blank" style="background-color: #1a73e8; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500; display: inline-block;">Xác thực email</a>
    </div>

    <p>Nếu nút trên không hoạt động, bạn có thể sao chép và dán đường dẫn sau vào trình duyệt:</p>
    <p style="word-break: break-all;"><a href="${verifyUrl}" target="_blank">${verifyUrl}</a></p>

    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />

    <p style="font-size: 12px; color: #5f6368;">
      Nếu bạn không đăng ký tài khoản này, vui lòng bỏ qua email này.
    </p>
  </div>
  `,
    });
  }
  // VERIFY EMAIL
  async verifyEmail(token: string) {
    const user = await prisma.user.findFirst({
      where: {
        verifyToken: token,
        verifyExpires: { gt: new Date() }, // token chưa hết hạn
      },
    });

    if (!user) {
      return { status: 'error', message: 'Token không hợp lệ hoặc đã hết hạn.' };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        verified: true,
        verifyToken: null,
        verifyExpires: null,
      },
    });

    return { status: 'ok', message: 'Xác thực thành công!' };
  }

  // RESEND VERIFY EMAIL
  async resendVerifyEmail(email: string) {
    // Tìm user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { status: 'error', message: 'Không tìm thấy tài khoản.' };
    }

    if (user.verified) {
      return { status: 'error', message: 'Tài khoản đã được xác thực trước đó.' };
    }

    // Tạo token mới + expiry mới
    const verifyToken = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    // Lưu lại token mới
    await prisma.user.update({
      where: { id: user.id },
      data: {
        verifyToken,
        verifyExpires: expires,
      },
    });

    // Gửi email xác thực mới
    await this.sendVerifyEmail(email, verifyToken);

    return { status: 'ok', message: 'Email xác thực mới đã được gửi.' };
  }

  async forgotPassword(email: string) {
    try {
      // Tìm user
      const user = await this.userService.findOneEmail({ email, type: 'user' });

      if (!user) {
        // Email không tồn tại → trả thông báo
        return { status: 'error', message: 'Email không tồn tại.' };
      }

      // Email tồn tại → tạo token + expiry
      const token = crypto.randomUUID();
      const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 phút

      await prisma.user.update({
        where: { id: user.id },
        data: { passwordResetToken: token, passwordResetExpires: expires },
      });

      const resetUrl = `${this.configService.get('FRONTEND_URL')}/dat-lai-mat-khau?token=${token}`;

      // Gửi mail reset
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'thanhnt040201@gmail.com',
          pass: 'azdd kuuw bfpp kupn',
        },
      });

      await transporter.sendMail({
        from: '"English Master" <thanhnt040201@gmail.com>',
        to: user.email,
        subject: 'Đặt lại mật khẩu English Master',
        html: `
  <div style="font-family: Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #202124; background-color: #f9f9f9; border-radius: 8px;">
      <!--<div style="text-align: center; margin-bottom: 20px;">
      <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(45deg, #673ab7, #9c27b0); display: inline-flex; align-items: center; justify-content: center; color: #fff; font-size: 28px; font-weight: bold;">
        EM
      </div>
    </div> -->

    <h2 style="text-align: center; color: #202124;">Khôi phục mật khẩu</h2>

    <p>Xin chào <strong>${user.email}</strong>,</p>
    <p>Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản English Master. Nhấn vào nút bên dưới để đặt mật khẩu mới:</p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetUrl}" target="_blank" 
        style="background-color: #1a73e8; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500; display: inline-block;">
        Đặt lại mật khẩu
      </a>
    </div>

    <p>Nếu nút trên không hoạt động, bạn có thể sao chép và dán đường dẫn sau vào trình duyệt:</p>
    <p style="word-break: break-all;"><a href="${resetUrl}" target="_blank">${resetUrl}</a></p>

    <p><i>Liên kết hết hạn sau 15 phút</i></p>

    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />

    <p style="font-size: 12px; color: #5f6368;">
      Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.
    </p>
  </div>
  `,
      });

      // Trả thông báo thành công
      return { status: 'ok', message: `Đã gửi email tới ${user.email}.` };
    } catch (err) {
      console.error(err);
      return { status: 'error', message: 'Có lỗi xảy ra. Vui lòng thử lại sau.' };
    }
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: { gt: new Date() },
      },
    });

    if (!user) {
      return { status: 'error', message: 'Token không hợp lệ hoặc đã hết hạn.' };
    }

    // Hash password mới
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    return { status: 'ok', message: 'Đặt lại mật khẩu thành công!' };
  }
}
