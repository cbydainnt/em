import { ComboType } from '@/enums/enum';
import { Injectable, Logger, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { Combo, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  errorFormat: 'colorless',
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

export interface CreateComboDto {
  combo_name: string;
  original_price: number;
  combo_type?: number;
  price: number;
  courses: string[];
  categories?: string[];
}

export interface UpdateComboDto {
  combo_name?: string;
  original_price?: number;
  price?: number;
  combo_type?: number;
  courses?: string[];
  categories?: string[];
  del_flg?: boolean;
}

export interface ComboFilterDto {
  page?: number;
  pageSize?: number;
  combo_type?: number;
  search?: string;
  includeDeleted?: boolean;
}

@Injectable()
export class ComboService {
  private readonly logger = new Logger(ComboService.name);

  async findAll(): Promise<Combo[]> {
    try {
      const combos = await prisma.combo.findMany({
        where: {
          del_flg: false,
          courses: { some: {} },
        },
      });

      const comboIds = combos.map((c) => c.combo_id);

      const comboCourses = await prisma.comboCourse.findMany({
        where: {
          combo_id: { in: comboIds },
          del_flg: false,
        },
        include: {
          course: true,
        },
      });

      const now = new Date();
      const comboMap = new Map<string, typeof comboCourses>();

      comboCourses.forEach((cc) => {
        if (!comboMap.has(cc.combo_id)) {
          comboMap.set(cc.combo_id, []);
        }
        comboMap.get(cc.combo_id)!.push(cc);
      });

      const notAllowedCombo = new Set<string>();

      comboMap.forEach((courses, comboId) => {
        const validCourses = courses.filter((cc) => cc.course && cc.course.del_flg === false);

        if (validCourses.length === 0) {
          notAllowedCombo.add(comboId);
          return;
        }

        const expiredCount = validCourses.filter((cc) => cc.course.access_type === 3 && cc.course.access_expire_at && cc.course.access_expire_at < now).length;

        if (expiredCount === validCourses.length) {
          notAllowedCombo.add(comboId);
        }
      });

      return combos.filter((combo) => !notAllowedCombo.has(combo.combo_id));
    } catch (error: any) {
      this.logger.error(error.message);
      return [];
    }
  }

  async findAllForAdmin(filters: ComboFilterDto): Promise<{ data: any[]; total: number }> {
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

      if (filters.combo_type) {
        where.combo_type = filters.combo_type;
      }

      if (filters.search) {
        const searchTerm = filters.search.trim();

        where.OR = [
          {
            combo_name: {
              contains: searchTerm,
            },
          },
        ];
      }

      const [combos, total] = await Promise.all([
        prisma.combo.findMany({
          where,
          skip,
          take: pageSize,
          include: {
            courses: {
              include: {
                course: {
                  select: {
                    course_id: true,
                    course_name: true,
                  },
                },
              },
              orderBy: {
                course: {
                  course_name: 'asc',
                },
              },
            },
            categories: {
              include: {
                category: {
                  select: {
                    category_id: true,
                    title: true,
                  },
                },
              },
              orderBy: {
                category: {
                  title: 'asc',
                },
              },
            },
          },
          orderBy: {
            updated_at: 'desc',
          },
        }),
        prisma.combo.count({ where }),
      ]);

      const data = combos.map((combo) => ({
        combo_id: combo.combo_id,
        combo_name: combo.combo_name,
        combo_type: combo.combo_type,
        original_price: combo.original_price,
        price: combo.price,
        del_flg: combo.del_flg,
        created_at: combo.created_at,
        updated_at: combo.updated_at,
        created_by: combo.created_by,
        updated_by: combo.updated_by,
        courses: combo.courses.map((cc) => cc.course),
        categories: combo.categories.map((cc) => cc.category),
      }));

      return { data, total };
    } catch (error: any) {
      this.logger.error('Error fetching combos for admin', error);
      throw new InternalServerErrorException('Failed to fetch combos');
    }
  }

  async getCoursesByComboId(comboId: string): Promise<any[]> {
    try {
      const combo = await prisma.combo.findFirst({
        where: {
          combo_id: comboId,
          del_flg: false,
        },
        include: {
          courses: {
            where: {
              course: {
                del_flg: false,
              },
            },
            include: {
              course: {
                include: {
                  ratingSummary: true,
                },
              },
            },
          },
        },
      });

      if (!combo) {
        throw new NotFoundException('Combo not found or deleted');
      }

      // Transform data
      return combo.courses
        .map((cc) => cc.course)
        .filter((course) => course !== null)
        .map((course) => ({
          course_id: course.course_id,
          course_name: course.course_name,
          course_description: course.course_description,
          course_price: course.course_price,
          course_original_price: course.course_original_price,
          state: course.state,
          created_at: course.created_at,
          thumbnail: course.thumbnail,
          avg_rating: course.ratingSummary?.avg_rating || 0,
          total_reviews: course.ratingSummary?.total_reviews || 0,
          access_duration_months: course.access_duration_months || 0,
          access_type: course.access_type,
          access_expire_at: course.access_expire_at,
        }));
    } catch (error) {
      this.logger.error(`Error fetching courses for combo id ${comboId}`, error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch combo courses');
    }
  }

  async getComboGroupByCategory() {
    const categories = await prisma.category.findMany({
      where: { del_flg: false },
      include: {
        combos: {
          include: {
            combo: true,
          },
        },
      },
    });

    // Get all comboId in categories
    const allComboIds = categories.flatMap((cat) => cat.combos.map((cc) => cc.combo_id));

    const comboCourses = await prisma.comboCourse.findMany({
      where: {
        combo_id: { in: allComboIds },
        del_flg: false,
      },
      include: {
        course: true,
      },
    });

    const now = new Date();

    const comboMap = new Map<string, typeof comboCourses>();

    comboCourses.forEach((cc) => {
      if (!comboMap.has(cc.combo_id)) {
        comboMap.set(cc.combo_id, []);
      }
      comboMap.get(cc.combo_id)!.push(cc);
    });

    //Array contain combo has course invalid (all of course in combo are expired)
    const notAllowedCombo: string[] = [];

    //Get notAllowedCombo
    comboMap.forEach((courses, comboId) => {
      // Tổng course hợp lệ (del_flg=false)
      const countCourse = courses.filter((cc) => cc.course && cc.course.del_flg === false).length;

      let count = 0;

      courses.forEach((cc) => {
        const c = cc.course;
        if (c && c.del_flg === false && c.access_type === 3 && c.access_expire_at && c.access_expire_at < now) {
          count++;
        }
      });

      if (countCourse > 0 && countCourse === count) {
        notAllowedCombo.push(comboId);
      }
    });
    // Lọc combos trong mỗi category
    return categories
      .map((cat) => ({
        ...cat,
        combos: cat.combos.filter((cc) => cc.combo && !cc.combo.del_flg && !notAllowedCombo.includes(cc.combo_id)),
      }))
      .filter((cat) => cat.combos.length > 0);
  }

  async findByComboId(comboId: string): Promise<any> {
    try {
      const combo = await prisma.combo.findUnique({
        where: { combo_id: comboId },
        include: {
          courses: {
            include: {
              course: {
                select: {
                  course_id: true,
                  course_name: true,
                },
              },
            },
          },
          categories: {
            include: {
              category: {
                select: {
                  category_id: true,
                  title: true,
                },
              },
            },
          },
        },
      });

      if (!combo) {
        throw new NotFoundException(`Combo with ID ${comboId} not found`);
      }

      return {
        ...combo,
        courses: combo.courses.map((cc) => cc.course),
        categories: combo.categories.map((cc) => cc.category),
      };
    } catch (error) {
      this.logger.error(`Error fetching combo with id ${comboId}`, error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch combo');
    }
  }

  async createCombo(data: CreateComboDto): Promise<Combo> {
    try {
      const nameRegex = /^[a-zA-ZÀ-ỹ0-9\s.,!?()\-]+$/;
      if (!nameRegex.test(data.combo_name.trim())) {
        throw new BadRequestException('Tên combo không được chứa ký tự đặc biệt');
      }

      const existing = await prisma.combo.findUnique({
        where: { combo_name: data.combo_name },
      });

      if (existing) {
        throw new BadRequestException('Tên combo đã tồn tại');
      }

      const combo = await prisma.combo.create({
        data: {
          combo_name: data.combo_name,
          original_price: data.original_price,
          combo_type: data.combo_type || ComboType.NORMAL,
          price: data.price,
          created_at: new Date(),
          updated_at: new Date(),
          courses: {
            create:
              data.courses?.map((courseId) => ({
                course: {
                  connect: { course_id: courseId },
                },
              })) || [],
          },
          categories: {
            create:
              data.categories?.map((categoryId) => ({
                category: {
                  connect: { category_id: categoryId },
                },
              })) || [],
          },
        },
      });

      return combo;
    } catch (error: any) {
      this.logger.error('Error creating combo', error);
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Failed to create combo');
    }
  }

  async updateCombo(comboId: string, data: UpdateComboDto): Promise<Combo> {
    try {
      const existing = await prisma.combo.findUnique({
        where: { combo_id: comboId },
      });

      if (!existing) {
        throw new NotFoundException(`Combo with ID ${comboId} not found`);
      }

      if (data.combo_name && data.combo_name !== existing.combo_name) {
        const nameRegex = /^[a-zA-ZÀ-ỹ0-9\s.,!?()\-]+$/;
        if (!nameRegex.test(data.combo_name.trim())) {
          throw new BadRequestException('Tên combo không được chứa ký tự đặc biệt');
        }

        const duplicateName = await prisma.combo.findUnique({
          where: { combo_name: data.combo_name },
        });

        if (duplicateName) {
          throw new BadRequestException('Tên combo đã tồn tại');
        }
      }

      // Update combo
      const updateData: any = {
        updated_at: new Date(),
      };

      if (data.combo_name !== undefined) updateData.combo_name = data.combo_name;
      if (data.combo_type !== undefined) updateData.combo_type = data.combo_type;
      if (data.original_price !== undefined) updateData.original_price = data.original_price;
      if (data.price !== undefined) updateData.price = data.price;
      if (data.del_flg !== undefined) updateData.del_flg = data.del_flg;

      // Update courses if provided
      if (data.courses) {
        // Delete existing course relations
        await prisma.comboCourse.deleteMany({
          where: { combo_id: comboId },
        });

        // Create new course relations
        updateData.courses = {
          create: data.courses.map((courseId) => ({
            course: {
              connect: { course_id: courseId },
            },
          })),
        };
      }

      // Update categories if provided
      if (data.categories) {
        // Delete existing category relations
        await prisma.categoryCombo.deleteMany({
          where: { combo_id: comboId },
        });

        // Create new category relations
        updateData.categories = {
          create: data.categories.map((categoryId) => ({
            category: {
              connect: { category_id: categoryId },
            },
          })),
        };
      }

      const combo = await prisma.combo.update({
        where: { combo_id: comboId },
        data: updateData,
      });

      return combo;
    } catch (error) {
      this.logger.error(`Error updating combo with id ${comboId}`, error);
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update combo');
    }
  }

  async softDeleteCombo(comboId: string): Promise<{ message: string }> {
    try {
      const combo = await prisma.combo.findUnique({
        where: { combo_id: comboId },
      });

      if (!combo) {
        throw new NotFoundException(`Combo with ID ${comboId} not found`);
      }

      await prisma.combo.update({
        where: { combo_id: comboId },
        data: {
          del_flg: true,
          updated_at: new Date(),
        },
      });

      return { message: 'Combo soft deleted successfully' };
    } catch (error) {
      this.logger.error(`Error soft deleting combo with id ${comboId}`, error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to soft delete combo');
    }
  }

  async hardDeleteCombo(comboId: string): Promise<{ message: string }> {
    try {
      const combo = await prisma.combo.findUnique({
        where: { combo_id: comboId },
      });

      if (!combo) {
        throw new NotFoundException(`Combo with ID ${comboId} not found`);
      }

      // Delete related records first
      await prisma.comboCourse.deleteMany({
        where: { combo_id: comboId },
      });

      await prisma.categoryCombo.deleteMany({
        where: { combo_id: comboId },
      });

      // Delete the combo
      await prisma.combo.delete({
        where: { combo_id: comboId },
      });

      return { message: 'Combo permanently deleted successfully' };
    } catch (error) {
      this.logger.error(`Error hard deleting combo with id ${comboId}`, error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to permanently delete combo');
    }
  }

  async bulkSoftDelete(comboIds: string[]): Promise<{ message: string; count: number }> {
    try {
      const result = await prisma.combo.updateMany({
        where: {
          combo_id: { in: comboIds },
        },
        data: {
          del_flg: true,
          updated_at: new Date(),
        },
      });

      return { message: 'Combos soft deleted successfully', count: result.count };
    } catch (error) {
      this.logger.error('Error bulk soft deleting combos', error);
      throw new InternalServerErrorException('Failed to bulk soft delete combos');
    }
  }

  // Bulk hard delete
  async bulkHardDelete(comboIds: string[]): Promise<{ message: string; count: number }> {
    try {
      // Delete related records first
      await prisma.comboCourse.deleteMany({
        where: { combo_id: { in: comboIds } },
      });

      await prisma.categoryCombo.deleteMany({
        where: { combo_id: { in: comboIds } },
      });

      // Delete combos
      const result = await prisma.combo.deleteMany({
        where: {
          combo_id: { in: comboIds },
        },
      });

      return { message: 'Combos permanently deleted successfully', count: result.count };
    } catch (error) {
      this.logger.error('Error bulk hard deleting combos', error);
      throw new InternalServerErrorException('Failed to bulk hard delete combos');
    }
  }

  // Restore soft deleted combo
  async restoreCombo(comboId: string): Promise<{ message: string }> {
    try {
      const combo = await prisma.combo.findUnique({
        where: { combo_id: comboId },
      });

      if (!combo) {
        throw new NotFoundException(`Combo with ID ${comboId} not found`);
      }

      await prisma.combo.update({
        where: { combo_id: comboId },
        data: {
          del_flg: false,
          updated_at: new Date(),
        },
      });

      return { message: 'Combo restored successfully' };
    } catch (error) {
      this.logger.error(`Error restoring combo with id ${comboId}`, error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to restore combo');
    }
  }

  async updateCourseOrder(comboId: string, courseIds: string[]): Promise<{ message: string }> {
    try {
      // Delete existing course relations
      await prisma.comboCourse.deleteMany({
        where: { combo_id: comboId },
      });

      // Create new course relations with order
      await prisma.comboCourse.createMany({
        data: courseIds.map((courseId) => ({
          combo_id: comboId,
          course_id: courseId,
        })),
      });

      return { message: 'Course order updated successfully' };
    } catch (error) {
      this.logger.error(`Error updating course order for combo ${comboId}`, error);
      throw new InternalServerErrorException('Failed to update course order');
    }
  }
  async findHotCombos(): Promise<Combo[]> {
    try {
      return await prisma.combo.findMany({
        where: {
          del_flg: false,
          combo_type: ComboType.HOT,
        },
      });
    } catch (error) {
      this.logger.error('Error fetching hot combos', error);
      throw new InternalServerErrorException('Failed to fetch hot combos');
    }
  }
}
