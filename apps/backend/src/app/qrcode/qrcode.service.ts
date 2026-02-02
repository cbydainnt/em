import { Injectable,  } from '@nestjs/common';
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
export class QRCodeService {
  private readonly prisma = new PrismaClient();

}
