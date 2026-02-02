import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { CategoryFilterDto, CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category-create.input';
import { UpdateCategoryDto } from './dto/category-update.input';

@Controller('admin/categories')
export class AdminCategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async getAllForAdmin(@Query('page') page?: string, @Query('pageSize') pageSize?: string, @Query('search') search?: string, @Query('includeDeleted') includeDeleted?: string) {
    const filters: CategoryFilterDto = {
      page: page ? parseInt(page) : 1,
      pageSize: pageSize ? parseInt(pageSize) : 20,
      search: search || undefined,
      includeDeleted: includeDeleted === 'true',
    };
    return await this.categoryService.findAllForAdmin(filters);
  }

  @Get('combos/available')
  async getAvailableCombos(@Query('categoryId') categoryId?: string) {
    return this.categoryService.getAvailableCombos(categoryId);
  }

  @Get(':categoryId')
  async getByCategoryId(@Param('categoryId') categoryId: string) {
    return await this.categoryService.findByCategoryId(categoryId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCategory(@Body() data: CreateCategoryDto) {
    return await this.categoryService.createCategory(data);
  }

  @Put(':categoryId')
  async update(@Param('categoryId') categoryId: string, @Body() data: UpdateCategoryDto) {
    return this.categoryService.updateCategory(categoryId, data);
  }

  @Delete(':id/soft')
  async softDeleteCategory(@Param('id') id: string) {
    return await this.categoryService.softDeleteCategory(id);
  }

  @Delete(':id/hard')
  async hardDeleteCategory(@Param('id') id: string) {
    return await this.categoryService.hardDeleteCategory(id);
  }

  @Put(':id/restore')
  async restoreCategory(@Param('id') id: string) {
    return await this.categoryService.restoreCategory(id);
  }

  @Post('bulk-soft-delete')
  async bulkSoftDelete(@Body() data: { ids: string[] }) {
    return await this.categoryService.bulkSoftDelete(data.ids);
  }

  @Post('bulk-hard-delete')
  async bulkHardDelete(@Body() data: { ids: string[] }) {
    return await this.categoryService.bulkHardDelete(data.ids);
  }

  @Post(':categoryId/combos')
  async addCombos(@Param('categoryId') id: string, @Body() data: { combo_ids: string[] }) {
    return await this.categoryService.addCombosToCategory(id, data.combo_ids);
  }

  @Delete(':categoryId/combos')
  async removeCombos(@Param('categoryId') id: string, @Body() body: { combo_ids: string[] }) {
    return await this.categoryService.removeCombosFromCategory(id, body.combo_ids);
  }

  @Put(':categoryId/combo-order')
  async updateComboOrder(@Param('categoryId') id: string, @Body() data: { comboIds: string[] }) {
    return await this.categoryService.updateComboOrder(id, data.comboIds);
  }
}
