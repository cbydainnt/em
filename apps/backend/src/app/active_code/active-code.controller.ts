import { Body, Controller, Post, Put, Param, Get, Query } from '@nestjs/common';
import { ActiveCodeService } from './active-code.service';
import { CreateActiveCodeDto } from './dto/create-active-code.dto';
import { ActiveCodeStatus } from '@/enums/enum';
@Controller('active-code')
export class ActiveCodeController {
  constructor(private readonly activeCodeService: ActiveCodeService) {}

  @Post()
  async createActiveCode(@Body() dto: CreateActiveCodeDto) {
    let status: number = -1;
    const statusInput = dto.active_code_status?.toLowerCase();
    switch (statusInput) {
      case 'unused':
        status = ActiveCodeStatus.UNUSED;
        break;
      case 'used':
        status = ActiveCodeStatus.USED;
        break;
      case 'expired':
        status = ActiveCodeStatus.EXPIRED;
        break;
      default:
        throw new Error(`Status is not valid: ${dto.active_code_status}`);
    }
    return this.activeCodeService.createActiveCode(dto, status);
  }
  @Post('activate')
  async activate(@Body('code') code: string, @Body('course_id') course_id: string, @Body('user_id') user_id: string) {
    if (!code) {
      return { success: false, message: 'Mã không hợp lệ' };
    }
    if (!course_id) {
      return { success: false, message: 'Vui lòng chọn khóa học.' };
    }
    if (!user_id) {
      return { success: false, message: 'Vui lòng đăng nhập để kích hoạt khóa học.' };
    }
    return this.activeCodeService.activateCourse(user_id, course_id, code);
  }

  @Get('check-status')
  async checkStatus(@Query('user_id') user_id: string, @Query('course_id') course_id: string) {
    if (!user_id || !course_id) {
      return {
        success: false,
        message: 'Thiếu tham số user_id hoặc course_id.',
      };
    }

    const result = await this.activeCodeService.checkStatus(user_id, course_id);
    return {
      success: true,
      ...result,
    };
  }

  @Get('course-code/:user_id/:course_id?/:order_item_id?')
  async getActiveCodeByUser(@Param('user_id') user_id: string, @Param('course_id') course_id?: string, @Param('order_item_id') order_item_id?: string) {
    if (!user_id) {
      return { success: false, message: 'Thiếu user_id' };
    }
    const codes = await this.activeCodeService.getActiveCodeByUser(user_id, course_id, order_item_id);
    return {
      success: true,
      data: codes.map((code) => ({
        ...code,
        expires_at: code.expires_at,
      })),
    };
  }
  @Get('unused')
  async getUnused(@Query('user_id') user_id: string, @Query('course_id') course_id: string) {
    const codes = await this.activeCodeService.getUnusedCodes(user_id, course_id);
    return codes; // [{ code: 'abc123' }]
  }
}
