import { Module } from '@nestjs/common';
import { MinIOController } from './minio.controler';
import { MinIOService } from './minio.service';

@Module({
  controllers: [MinIOController],
  providers: [MinIOService],
  exports: [MinIOService],
})
export class MinIOModule {}
