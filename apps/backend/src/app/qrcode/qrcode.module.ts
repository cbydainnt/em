import { Module } from '@nestjs/common';
import { QRCodeService } from './qrcode.service';
import { QRCodeController } from './qrcode.controller';

@Module({
  imports: [],
  providers: [QRCodeService],
  exports: [QRCodeService],
  controllers: [QRCodeController],
})
export class QRCodeModule {}
