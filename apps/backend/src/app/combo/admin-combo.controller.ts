import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ComboService, CreateComboDto, UpdateComboDto, ComboFilterDto } from './combo.service';

@Controller('admin/combos')
export class AdminComboController {
  constructor(private readonly comboService: ComboService) {}

  @Get()
  async getAllForAdmin(@Query('page') page?: string, @Query('pageSize') pageSize?: string, @Query('search') search?: string, @Query('includeDeleted') includeDeleted?: string) {
    const filters: ComboFilterDto = {
      page: page ? parseInt(page) : 1,
      pageSize: pageSize ? parseInt(pageSize) : 20,
      search: search || undefined,
      includeDeleted: includeDeleted === 'true',
    };

    return await this.comboService.findAllForAdmin(filters);
  }

  @Get(':id')
  async getComboById(@Param('id') id: string) {
    return await this.comboService.findByComboId(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCombo(@Body() data: CreateComboDto) {
    return await this.comboService.createCombo(data);
  }

  @Put(':id')
  async updateCombo(@Param('id') id: string, @Body() data: UpdateComboDto) {
    return await this.comboService.updateCombo(id, data);
  }

  @Delete(':id/soft')
  async softDeleteCombo(@Param('id') id: string) {
    return await this.comboService.softDeleteCombo(id);
  }

  @Delete(':id/hard')
  async hardDeleteCombo(@Param('id') id: string) {
    return await this.comboService.hardDeleteCombo(id);
  }

  @Put(':id/restore')
  async restoreCombo(@Param('id') id: string) {
    return await this.comboService.restoreCombo(id);
  }

  @Post('bulk-soft-delete')
  async bulkSoftDelete(@Body() data: { ids: string[] }) {
    return await this.comboService.bulkSoftDelete(data.ids);
  }

  @Post('bulk-hard-delete')
  async bulkHardDelete(@Body() data: { ids: string[] }) {
    return await this.comboService.bulkHardDelete(data.ids);
  }

  @Put(':id/course-order')
  async updateCourseOrder(@Param('id') id: string, @Body() data: { courseIds: string[] }) {
    return await this.comboService.updateCourseOrder(id, data.courseIds);
  }
}
