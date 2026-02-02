import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { AdminCategoryController } from './admin-category.controller';

@Module({
  imports: [],
  providers: [CategoryService],
  exports: [CategoryService],
  controllers: [CategoryController, AdminCategoryController],
})
export class CategoryModule {}
