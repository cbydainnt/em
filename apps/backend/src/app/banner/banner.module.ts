import { Module } from '@nestjs/common';
import { MinIOService } from '../minio/minio.service';
import { ConfigService } from '@nestjs/config';
import { AdminBannerController } from './admin-banner.controller';
import { AdminBannerService } from './admin-banner.service';

@Module({
  imports: [],
  providers: [AdminBannerService, MinIOService, ConfigService],
  exports: [AdminBannerService],
  controllers: [AdminBannerController],
})
export class BannerModule {}
