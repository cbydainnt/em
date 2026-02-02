// category.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll() {
    return await this.categoryService.findAll();
  }

  @Get(':categoryId')
  async getByCategoryId(@Param('categoryId') categoryId: string) {
    return await this.categoryService.findByCategoryId(categoryId);
  }
}
