import { Injectable, Logger, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Category, PrismaClient } from '@prisma/client';
import { CreateCategoryDto } from './dto/category-create.input';
import { UpdateCategoryDto } from './dto/category-update.input';

const prisma = new PrismaClient({
  errorFormat: 'colorless',
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

export interface CategoryFilterDto {
  page?: number;
  pageSize?: number;
  search?: string;
  includeDeleted?: boolean;
}

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  async findAll(): Promise<Category[]> {
    try {
      return await prisma.category.findMany({
        where: {
          del_flg: false,
          combos: { some: {} },
        },
        orderBy: { sort_order: 'asc' },
      });
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async findByCategoryId(categoryId: string): Promise<any> {
    try {
      const category = await prisma.category.findUnique({
        where: {
          category_id: categoryId,
        },
        include: {
          combos: {
            include: {
              combo: {
                select: {
                  combo_id: true,
                  combo_name: true,
                  price: true,
                  original_price: true,
                },
              },
            },
          },
        },
      });

      if (!category) {
        throw new NotFoundException('Không tìm thấy danh mục');
      }

      return {
        ...category,
        combos: category.combos.map((cc) => cc.combo),
      };
    } catch (error: any) {
      this.logger.error(error.message);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch category');
    }
  }

  async createCategory(data: CreateCategoryDto): Promise<Category> {
    try {
      // Kiểm tra trùng tên
      const existing = await prisma.category.findUnique({
        where: { title: data.title },
      });

      if (existing && !existing.del_flg) {
        throw new BadRequestException('Tên danh mục đã tồn tại');
      }

      return await prisma.category.create({
        data: {
          title: data.title,
          created_by: data.created_by ?? null,
          del_flg: false,
          sort_order: data.sort_order ?? 0,
        },
      });
    } catch (error: any) {
      this.logger.error(error.message);
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  async updateCategory(categoryId: string, data: UpdateCategoryDto): Promise<Category> {
    try {
      const category = await prisma.category.findUnique({
        where: { category_id: categoryId },
      });

      if (!category) {
        throw new NotFoundException('Không tìm thấy danh mục');
      }

      if (data.title && data.title !== category.title) {
        const existing = await prisma.category.findUnique({
          where: { title: data.title },
        });

        if (existing && existing.category_id !== categoryId) {
          throw new BadRequestException('Tên danh mục đã tồn tại');
        }
      }

      return await prisma.category.update({
        where: { category_id: categoryId },
        data: {
          ...data,
          updated_at: new Date(),
        },
      });
    } catch (error: any) {
      this.logger.error(error.message);
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Failed to update category');
    }
  }

  async deleteCategory(categoryId: string): Promise<{ success: boolean; message: string }> {
    try {
      const category = await prisma.category.findUnique({
        where: { category_id: categoryId },
        include: { combos: true },
      });

      if (!category) {
        throw new NotFoundException('Không tìm thấy danh mục');
      }

      await prisma.category.update({
        where: { category_id: categoryId },
        data: { del_flg: true },
      });

      return {
        success: true,
        message: 'Xóa danh mục thành công',
      };
    } catch (error: any) {
      this.logger.error(error.message);
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Không thể xóa danh mục');
    }
  }

  async deleteMultipleCategories(categoryIds: string[]): Promise<{ success: boolean; message: string }> {
    try {
      await prisma.category.updateMany({
        where: {
          category_id: { in: categoryIds },
        },
        data: { del_flg: true },
      });

      return {
        success: true,
        message: `Đã xóa ${categoryIds.length} danh mục`,
      };
    } catch (error: any) {
      this.logger.error(error.message);
      throw new BadRequestException('Không thể xóa danh mục');
    }
  }

  async findAllForAdmin(filters: CategoryFilterDto): Promise<{ data: any[]; total: number }> {
    try {
      const page = filters.page || 1;
      const pageSize = filters.pageSize || 20;
      const skip = (page - 1) * pageSize;

      const where: any = {};

      if (filters.includeDeleted) {
        where.del_flg = true;
      } else {
        where.del_flg = false;
      }

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.trim();

        where.OR = [
          {
            title: {
              contains: searchTerm,
            },
          },
        ];
      }

      const [categories, total] = await Promise.all([
        prisma.category.findMany({
          where,
          skip,
          take: pageSize,
          include: {
            combos: {
              include: {
                combo: {
                  select: {
                    combo_id: true,
                    combo_name: true,
                    price: true,
                    original_price: true,
                  },
                },
              },
            },
          },
          orderBy: [{ updated_at: 'desc' }],
        }),
        prisma.category.count({ where }),
      ]);

      const data = categories.map((cat) => ({
        category_id: cat.category_id,
        title: cat.title,
        sort_order: cat.sort_order,
        created_at: cat.created_at,
        updated_at: cat.updated_at,
        created_by: cat.created_by,
        updated_by: cat.updated_by,
        del_flg: cat.del_flg,
        combos: cat.combos.map((cc) => cc.combo),
      }));

      return { data, total };
    } catch (error: any) {
      this.logger.error('Error fetching categories for admin', error);
      throw new InternalServerErrorException('Failed to fetch categories');
    }
  }

  async softDeleteCategory(categoryId: string): Promise<{ message: string }> {
    try {
      const category = await prisma.category.findUnique({
        where: { category_id: categoryId },
      });

      if (!category) {
        throw new NotFoundException(`Category with ID ${categoryId} not found`);
      }

      await prisma.category.update({
        where: { category_id: categoryId },
        data: {
          del_flg: true,
          updated_at: new Date(),
        },
      });

      return { message: 'Category soft deleted successfully' };
    } catch (error) {
      this.logger.error(`Error soft deleting category with id ${categoryId}`, error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to soft delete category');
    }
  }

  async hardDeleteCategory(categoryId: string): Promise<{ message: string }> {
    try {
      const category = await prisma.category.findUnique({
        where: { category_id: categoryId },
      });

      if (!category) {
        throw new NotFoundException(`Category with ID ${categoryId} not found`);
      }

      // Delete related records first
      await prisma.categoryCombo.deleteMany({
        where: { category_id: categoryId },
      });

      // Delete the category
      await prisma.category.delete({
        where: { category_id: categoryId },
      });

      return { message: 'Category permanently deleted successfully' };
    } catch (error) {
      this.logger.error(`Error hard deleting category with id ${categoryId}`, error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to permanently delete category');
    }
  }

  async bulkSoftDelete(categoryIds: string[]): Promise<{ message: string; count: number }> {
    try {
      const result = await prisma.category.updateMany({
        where: {
          category_id: { in: categoryIds },
        },
        data: {
          del_flg: true,
          updated_at: new Date(),
        },
      });

      return { message: 'Categories soft deleted successfully', count: result.count };
    } catch (error) {
      this.logger.error('Error bulk soft deleting categories', error);
      throw new InternalServerErrorException('Failed to bulk soft delete categories');
    }
  }

  async bulkHardDelete(categoryIds: string[]): Promise<{ message: string; count: number }> {
    try {
      // Delete related records first
      await prisma.categoryCombo.deleteMany({
        where: { category_id: { in: categoryIds } },
      });

      // Delete categories
      const result = await prisma.category.deleteMany({
        where: {
          category_id: { in: categoryIds },
        },
      });

      return { message: 'Categories permanently deleted successfully', count: result.count };
    } catch (error) {
      this.logger.error('Error bulk hard deleting categories', error);
      throw new InternalServerErrorException('Failed to bulk hard delete categories');
    }
  }

  async restoreCategory(categoryId: string): Promise<{ message: string }> {
    try {
      const category = await prisma.category.findUnique({
        where: { category_id: categoryId },
      });

      if (!category) {
        throw new NotFoundException(`Category with ID ${categoryId} not found`);
      }

      await prisma.category.update({
        where: { category_id: categoryId },
        data: {
          del_flg: false,
          updated_at: new Date(),
        },
      });

      return { message: 'Category restored successfully' };
    } catch (error) {
      this.logger.error(`Error restoring category with id ${categoryId}`, error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to restore category');
    }
  }

  async addCombosToCategory(categoryId: string, comboIds: string[]): Promise<any> {
    try {
      // Kiểm tra category tồn tại
      const category = await prisma.category.findUnique({
        where: { category_id: categoryId },
      });

      if (!category) {
        throw new NotFoundException('Không tìm thấy danh mục');
      }

      // Lấy danh sách combo_id đã tồn tại trong category
      const existing = await prisma.categoryCombo.findMany({
        where: { category_id: categoryId },
        select: { combo_id: true },
      });

      const existingIds = new Set(existing.map((e) => e.combo_id));

      // Chỉ thêm những combo chưa có
      const createData = comboIds
        .filter((id) => !existingIds.has(id))
        .map((id) => ({
          category_id: categoryId,
          combo_id: id,
        }));

      if (createData.length > 0) {
        await prisma.categoryCombo.createMany({
          data: createData,
        });
      }

      return {
        success: true,
        message: createData.length > 0 ? `Đã thêm ${createData.length} combo mới vào danh mục` : 'Tất cả combos đã tồn tại trong danh mục',
      };
    } catch (error: any) {
      this.logger.error(error.message);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to add combos');
    }
  }

  async removeCombosFromCategory(categoryId: string, comboIds: string[]): Promise<any> {
    try {
      await prisma.categoryCombo.deleteMany({
        where: {
          category_id: categoryId,
          combo_id: { in: comboIds },
        },
      });

      return {
        success: true,
        message: 'Đã xóa combos khỏi danh mục',
      };
    } catch (error: any) {
      this.logger.error(error.message);
      throw new InternalServerErrorException('Failed to remove combos');
    }
  }

  async getAvailableCombos(categoryId?: string) {
    try {
      let excludeComboIds: string[] = [];

      if (categoryId) {
        const categoryWithCombos = await prisma.category.findUnique({
          where: { category_id: categoryId },
          include: {
            combos: {
              select: { combo_id: true },
            },
          },
        });

        excludeComboIds = categoryWithCombos?.combos.map((cc) => cc.combo_id) || [];
      }

      const combos = await prisma.combo.findMany({
        where: {
          del_flg: false,
          ...(excludeComboIds.length > 0 && {
            combo_id: { notIn: excludeComboIds },
          }),
        },
        select: {
          combo_id: true,
          combo_name: true,
          price: true,
          original_price: true,
        },
        orderBy: { combo_name: 'asc' },
      });

      return combos;
    } catch (error: any) {
      this.logger.error(error.message);
      throw new InternalServerErrorException('Failed to load available combos');
    }
  }

  async updateComboOrder(categoryId: string, comboIds: string[]): Promise<{ message: string }> {
    try {
      // Delete existing combo relations
      await prisma.categoryCombo.deleteMany({
        where: { category_id: categoryId },
      });

      // Create new combo relations with order
      await prisma.categoryCombo.createMany({
        data: comboIds.map((comboId) => ({
          category_id: categoryId,
          combo_id: comboId,
        })),
      });

      return { message: 'Combo order updated successfully' };
    } catch (error) {
      this.logger.error(`Error updating combo order for category ${categoryId}`, error);
      throw new InternalServerErrorException('Failed to update combo order');
    }
  }
}
