import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpsertTeacherProfileDto } from './dto/upsert-teacher-profile.dto';

@Injectable()
export class AdminTeacherProfileService implements OnModuleInit, OnModuleDestroy {
  private prisma = new PrismaClient();

  private readonly CATEGORY = 'teacherProfiles';
  private readonly PARAM_KEY = '6';

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }

  /**
   * GET profile giảng viên
   */
  async getProfile() {
    const records = await this.prisma.mSystem.findMany({
      where: {
        category: this.CATEGORY,
        del_flg: 0,
      },
      orderBy: { param_no: 'asc' },
    });

    return records.reduce<Record<string, string>>((acc, cur) => {
      acc[cur.param_name] = cur.param_value;
      return acc;
    }, {});
  }

  /**
   * UPSERT profile
   */
  async upsertProfile(dto: UpsertTeacherProfileDto) {
    const entries = Object.entries(dto).filter(([, value]) => value !== undefined);

    await Promise.all(
      entries.map(async ([name, value], index) => {
        const paramNo = String(index + 1);

        await this.prisma.mSystem.upsert({
          where: {
            param_key_param_no: {
              param_key: this.PARAM_KEY,
              param_no: paramNo,
            },
          },
          update: {
            param_name: name,
            param_value: value,
            category: this.CATEGORY,
            updated_at: new Date(),
          },
          create: {
            param_key: this.PARAM_KEY,
            param_no: paramNo,
            param_name: name,
            param_value: value,
            category: this.CATEGORY,
            created_by: 'admin',
          },
        });
      }),
    );

    return { success: true };
  }

  async deleteSkill(name: string) {
    await this.prisma.mSystem.deleteMany({
      where: {
        param_key: this.PARAM_KEY,
        param_name: name,
        category: this.CATEGORY,
      },
    });

    return { success: true };
  }
}
