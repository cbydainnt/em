import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

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
export class SectionService {
  private readonly logger = new Logger(SectionService.name);

  async getSectionById(sectionId: string) {
    try {
      return await prisma.section.findUnique({
        where: {
          section_id: sectionId,
          del_flg: false,
        },
        include: {
          course: true,
        },
      });
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }
}
