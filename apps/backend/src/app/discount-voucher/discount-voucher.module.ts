import { Module } from '@nestjs/common';
import { DiscountVoucherService } from './discount-voucher.service';
import { AdminDiscountVoucherController } from './admin-discount-voucher.controller';

@Module({
  imports: [],
  providers: [DiscountVoucherService],
  exports: [DiscountVoucherService],
  controllers: [AdminDiscountVoucherController],
})
export class DiscountVoucherModule {}
