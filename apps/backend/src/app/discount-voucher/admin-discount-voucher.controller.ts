import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { DiscountVoucherService } from './discount-voucher.service';
import { CreateDiscountVoucherInput } from './dto/create-discount-voucher.input';
import { UpdateDiscountVoucherInput } from './dto/update-discount-voucher.input';
import { FilterDiscountVoucherInput } from './dto/filter-discount-voucher.input';
import { JwtAuthGuard } from '../auth/login/jwt/jwt-auth.guard';

@Controller('admin/discount-vouchers')
@UseGuards(JwtAuthGuard)
export class AdminDiscountVoucherController {
  constructor(private readonly voucherService: DiscountVoucherService) {}

  @Post()
  async create(@Body() createDto: CreateDiscountVoucherInput) {
    return await this.voucherService.create(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateDiscountVoucherInput) {
    return await this.voucherService.update({ ...updateDto, id });
  }

  @Get(':id/applicable-items')
  async getApplicableItems(@Param('id') id: string) {
    return this.voucherService.getApplicableItems(id);
  }

  @Get()
  async findAll(@Query() filters: FilterDiscountVoucherInput) {
    return await this.voucherService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.voucherService.findOne(id);
  }

  @Delete()
  async remove(@Body('ids') ids: string[]) {
    const success = await this.voucherService.remove(ids);
    return { success };
  }

  @Put(':id/toggle-status')
  async toggleStatus(@Param('id') id: string) {
    return await this.voucherService.toggleStatus(id);
  }

  @Post('apply')
  async applyVoucher(@Body('code') code: string, @Body('userId') userId: string, @Body('orderItems') orderItems: any[], @Body('comboId') comboId?: string) {
    return await this.voucherService.applyVoucher(code, userId, orderItems, comboId);
  }

  @Post('use')
  async markVoucherUsed(@Body('voucherId') voucherId: string, @Body('userId') userId: string, @Body('orderId') orderId: string) {
    return await this.voucherService.markVoucherUsed(voucherId, userId, orderId);
  }
  @Get(':id/applicable-users')
  @UseGuards(JwtAuthGuard)
  async getApplicableUsers(@Param('id') id: string) {
    return await this.voucherService.getApplicableUsers(id);
  }
}
