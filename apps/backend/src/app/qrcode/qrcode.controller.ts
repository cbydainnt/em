import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { PayOS } from '@payos/node';
import { Request } from 'express';
@Controller('qrcode')
export class QRCodeController {
  private payOS: PayOS;

  constructor() {
    this.payOS = new PayOS({
      clientId: '1912033f-6d83-4f55-a02f-f0fb8c4d02be',
      apiKey: '25697b7d-a189-401c-bf97-1f3f0450395b',
      checksumKey: '16a12bbf618c33c0eb33f686a448c38882ed550a3fc166792452536cd6bd75f3',
    });
  }

  @Post('payos-link')
  async createPayOSLink(@Req() req: Request, @Body() body: { amount?: number; addInfo?: string; courseID?: string; comboID?: string; origin?: string }) {
    const DOMAIN = body.origin;
    const returnUrl = body.courseID ? `${DOMAIN}/thanh-toan?success=true&courseID=${body.courseID}` : body.comboID ? `${DOMAIN}/thanh-toan?success=true&comboID=${body.comboID}` : `${DOMAIN}/thanh-toan?success=true`;
    const cancelUrl = body.courseID ? `${DOMAIN}/thanh-toan?success=false&courseID=${body.courseID}` : body.comboID ? `${DOMAIN}/thanh-toan?success=false&comboID=${body.comboID}` : `${DOMAIN}/thanh-toan?success=false`;
    const timeOut = Math.floor(Date.now() / 1000) + 10 * 60;
    const data = {
      orderCode: Number(String(Date.now()).slice(-6)),
      amount: body.amount,
      description: body.addInfo,
      expiredAt: timeOut,
      returnUrl: returnUrl,
      cancelUrl: cancelUrl,
    };

    const paymentLinkResponse = await this.payOS.paymentRequests.create(data);
    return { checkoutUrl: paymentLinkResponse.checkoutUrl };
  }
}
