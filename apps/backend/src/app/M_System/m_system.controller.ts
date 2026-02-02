import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { M_SystemService } from './m_system.service';
import { mSystem } from '@/enums/enum';
import { UpdateMSystemDto } from './dto/update-msystem.dto';

@Controller('msystem')
export class M_SystemController {
  constructor(private readonly m_systemService: M_SystemService) {}

  @Get('theme-event')
  async getThemeEvent() {
    const value = await this.m_systemService.getThemeEvent();
    return { value };
  }

  @Post('theme-event')
  async setThemeEvent(@Body() body: { value: string }) {
    await this.m_systemService.setThemeEvent(body.value);
    return { success: true };
  }

  @Get(':param_key')
  async findBy_Param_key(@Param('param_key') param_key: string, @Query('deleted') deleted?: string) {
    let key: string = '';
    const keyInput = param_key?.toLowerCase();

    switch (keyInput) {
      case 'contact':
        key = mSystem.CONTACT.toString();
        break;
      case 'community':
        key = mSystem.COMMUNITY.toString();
        break;
      case 'knowledge':
        key = mSystem.KNOWLEDGE.toString();
        break;
      case 'policy':
        key = mSystem.POLICY.toString();
        break;
      case 'profile':
        key = mSystem.PROFILE.toString();
        break;
      case 'teacherprofiles':
        key = mSystem.TEACHERPROFILES.toString();
        break;
      default:
        throw new Error(`Status is not valid: ${param_key}`);
    }
    const delFlg = deleted === 'true' ? 1 : deleted === 'false' ? 0 : undefined;

    return await this.m_systemService.findBy_Param_key(key, delFlg);
  }

  @Get(':param_key/:param_no')
  async getByParamNo(@Param('param_key') param_key: string, @Param('param_no') param_no: string) {
    return await this.m_systemService.findBy_Param_key_ParamNo(param_key, param_no);
  }

  @Get()
  async getAll() {
    console.log('msystem get');
    return await this.m_systemService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateMSystemDto) {
    return await this.m_systemService.update(id, body);
  }

  @Put(':id/toggle')
  async toggleDelete(@Param('id') id: string, @Body() body: { del_flg: number }) {
    if (body.del_flg === 1) {
      return this.m_systemService.softDelete(id);
    }
    return this.m_systemService.restore(id);
  }
}
