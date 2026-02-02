import { Injectable, Logger } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import bcrypt from 'bcryptjs';
import { PrismaClient, User } from '@prisma/client';
import { UpdateUserInput } from './dto/update-user.input';
import { FilterUserInput } from './dto/filters-user.input';
import { MinIOService } from '../minio/minio.service';
import { ConfigService } from '@nestjs/config';

const prisma = new PrismaClient({
  errorFormat: 'colorless',
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

// prisma.$on('query', (event) => {
//   console.log(event);
// });

@Injectable()
export class UserService {
  private outputPath: string = '';
  private readonly logger = new Logger(UserService.name);
  private readonly configService = new ConfigService();
  private bucket: string = this.configService.get('MINIO_BUCKET');
  private readonly minIOService = new MinIOService(this.configService);

  async create(payload: CreateUserInput, userId: string): Promise<User | undefined> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });
      if (user) {
        return { id: 'exist', email: 'exist' } as User;
      }
      const salt = await bcrypt.genSalt(10);
      const password2 = await bcrypt.hash(payload.password, salt);
      console.log('>>> Creating user with payload:', payload);

      return await prisma.user.create({
        data: {
          type: payload.type,
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          address: payload.address,
          password: password2,
          avatar: payload.avatar,
          created_by_id: userId,
          updated_by_id: userId,
          verified: true,
          verifyToken: null,
          verifyExpires: null,
        },
      });
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async update(payload: UpdateUserInput, userId: string): Promise<User | null> {
    try {
      const { name, avatar, password, phone, address, type } = payload;
      const user = await prisma.user.findUnique({
        where: {
          id: payload.id,
        },
      });
      if (!user) {
        return null;
      }
      let password2 = undefined;
      if (password && password !== user.password) {
        const salt = await bcrypt.genSalt(10);
        password2 = await bcrypt.hash(password, salt);
      }

      if (avatar && avatar !== 'old_avatar' && user.avatar) {
        try {
          this.minIOService.deleteFile(this.bucket, user.avatar.replace(this.bucket + '/', ''));
        } catch (error) {
          console.log('deleteFile MinIO Service', error);
        }
      }

      return await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name,
          type: type || user.type,
          phone,
          address,
          avatar: avatar === 'old_avatar' ? user.avatar : avatar || user.avatar,
          password: password2,
          updated_by_id: userId,
          updated_at: new Date(),
        },
      });
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return null;
      }
      if (!(await bcrypt.compare(currentPassword, user.password!))) {
        return null;
      }
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(newPassword, salt);
      return await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password,
        },
      });
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async updateUserType(id: string, type: string, updatedBy: string) {
    if (!['admin', 'user', 'student', 'teacher'].includes(type)) {
      throw new Error('Loại quyền không hợp lệ');
    }

    const updated = await prisma.user.update({
      where: { id },
      data: {
        type,
        updated_by_id: updatedBy,
        updated_at: new Date(),
      },
    });

    return updated;
  }

  async findOneEmail(filters: { email: string; type: string | undefined }): Promise<User | undefined> {
    try {
      return await prisma.user.findFirst({
        where: {
          email: filters.email,
          //type: filters.type,
        },
      });
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }


  async findAll(filters: FilterUserInput): Promise<User[] | null> {
    try {
      let where: any = {};

      // Nếu có filter type thì thêm vào
      if (filters.type !== undefined && filters.type !== null) {
        where.type = filters.type;
      }

      if (filters.search) {
        const search = filters.search.trim();
        if (search.length > 0) {
          if (where.type !== undefined) {
            
            where = {
              ...where,
              OR: [{ name: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }],
            };
          } else {
           
            where = {
              OR: [{ name: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }],
            };
          }
        }
      }

      const page = filters.page ?? 1;
      const pageSize = filters.pageSize ?? 100;

      return await prisma.user.findMany({
        where,
        skip: pageSize * page - pageSize,
        take: pageSize,
        orderBy: { updated_at: 'desc' },
      });
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async count(filters: FilterUserInput): Promise<number> {
    try {
      let where: any = {};

      if (filters.type !== undefined && filters.type !== null) {
        where.type = filters.type;
      }

      if (filters.search) {
        const search = filters.search.trim();
        if (search.length > 0) {
          if (where.type !== undefined) {
            where = {
              ...where,
              OR: [{ name: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }],
            };
          } else {
            where = {
              OR: [{ name: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }],
            };
          }
        }
      }

      return await prisma.user.count({ where });
    } catch (error: any) {
      this.logger.error(error.message);
      return 0;
    }
  }

  async findOne(userId: string): Promise<User | undefined> {
    try {
      return await prisma.user.findFirst({
        where: {
          id: userId,
        },
        // include: {
        //   orders: true,
        //   cartItems: true,
        //   user_courses: true,
        // },
        include: {
          orders: {
            select: { order_items: { select: { combo_id: true, course_id: true } }, status: true },
          },
          cartItems: {
            select: { course_id: true },
          },
          user_courses: {
            select: { course_id: true },
          },
        },
      });
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async remove(ids: string[]) {
    try {
      await prisma.user.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
      return true;
    } catch (error: any) {
      this.logger.error(error.message);
      return false;
    }
  }
  //For google login
  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }
  findByGoogleId(googleId: string) {
    return prisma.user.findUnique({ where: { googleId } });
  }
  upsertGoogleUser(data: { email: string; name?: string; avatar?: string; googleId: string }) {
    return prisma.user.upsert({
      where: { email: data.email },
      create: { ...data, verified: true, type: 'user' },
      update: { avatar: data.avatar, googleId: data.googleId },
    });
  }

  async countUserByCourseId(courseId: string) {
    try {
      const totalUsers = await prisma.userCourse.count({
        where: {
          course_id: courseId,
        },
      });
      return totalUsers;
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async checkUserCoursePurchase(userId: string, courseId: string): Promise<boolean> {
    try {
      const userCourse = await prisma.userCourse.findUnique({
        where: {
          user_id_course_id: {
            user_id: userId,
            course_id: courseId,
          },
        },
      });
      return !!userCourse;
    } catch (error: any) {
      this.logger.error(error.message);
      return false;
    }
  }
}
