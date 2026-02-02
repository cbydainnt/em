import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient, MSystem } from '@prisma/client';
import { UpdateMSystemDto } from './dto/update-msystem.dto';

const fs = require('fs/promises');

const prisma = new PrismaClient({
  errorFormat: 'colorless',
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

@Injectable()
export class M_SystemService {
  private readonly logger = new Logger(M_SystemService.name);

  async findBy_Param_key_ParamNo(param_key: string, param_no: string): Promise<MSystem | null> {
    try {
      return await prisma.mSystem.findUnique({
        where: {
          param_key_param_no: {
            param_key,
            param_no,
          },
        },
      });
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }
  async findBy_Param_key(param_key: string, delFlg?: number): Promise<MSystem[]> {
    try {
      return await prisma.mSystem.findMany({
        where: {
          param_key: param_key,
          ...(delFlg !== undefined ? { del_flg: delFlg } : {}),
        },
        orderBy: {
          param_no: 'asc',
        },
      });
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async findAll(): Promise<MSystem[]> {
    return await prisma.mSystem.findMany();
  }

  async update(id: string, dto: UpdateMSystemDto): Promise<MSystem> {
    return prisma.mSystem.update({
      where: { id },
      data: {
        ...dto,
        updated_at: new Date(),
      },
    });
  }

  async softDelete(id: string): Promise<MSystem> {
    return prisma.mSystem.update({
      where: { id },
      data: {
        del_flg: 1,
        updated_at: new Date(),
      },
    });
  }

  async restore(id: string): Promise<MSystem> {
    return prisma.mSystem.update({
      where: { id },
      data: {
        del_flg: 0,
        updated_at: new Date(),
      },
    });
  }

  async getThemeEvent() {
    const record = await prisma.mSystem.findFirst({
      where: {
        param_name: 'theme_event',
        del_flg: 0,
      },
    });

    return record?.param_value ?? 'default';
  }

  async setThemeEvent(value: string) {
    const record = await prisma.mSystem.findFirst({
      where: {
        param_name: 'theme_event',
        del_flg: 0,
      },
    });

    if (!record) {
      await prisma.mSystem.create({
        data: {
          param_key: '7',
          param_no: '1',
          param_name: 'theme_event',
          param_value: value,
          del_flg: 0,
        },
      });
    } else {
      await prisma.mSystem.update({
        where: { id: record.id },
        data: {
          param_value: value,
          updated_at: new Date(),
        },
      });
    }
  }
}
