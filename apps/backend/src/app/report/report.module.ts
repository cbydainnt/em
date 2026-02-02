// report/report.module.ts
import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { ConfigModule } from '@nestjs/config';
import { MinIOService } from '../minio/minio.service';
import { AdminReportController } from './admin/report.admin.controller';

@Module({
  imports: [ConfigModule],
  controllers: [ReportController, AdminReportController],
  providers: [ReportService, MinIOService],
  exports: [ReportService],
})
export class ReportModule {}