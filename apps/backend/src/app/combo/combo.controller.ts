import { Controller, Get, Param } from '@nestjs/common';
import { ComboService } from './combo.service';

@Controller('combo')
export class ComboController {
  constructor(private readonly comboService: ComboService) {}
  @Get()
  async getAll() {
    return await this.comboService.findAll();
  }

  @Get('hot')
  async getHotCombos() {
    return await this.comboService.findHotCombos();
  }

  @Get('group-by-category')
  async getCourseByCategoryAndCombo() {
    return await this.comboService.getComboGroupByCategory();
  }

  @Get(':comboId/courses')
  async getCoursesByComboId(@Param('comboId') comboId: string) {
    return await this.comboService.getCoursesByComboId(comboId);
  }
  @Get(':comboId')
  async getByComboId(@Param('comboId') comboId: string) {
    return await this.comboService.findByComboId(comboId);
  }
}
