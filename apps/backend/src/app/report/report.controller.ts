// report/report.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  BadRequestException,
  Req,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ReportService } from './report.service';
import { CreateReportDto, UpdateReportStatusDto, AddReportCommentDto } from './dto/create-report.dto';
import { JwtAuthGuard } from '../auth/login/jwt/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { MinIOService } from '../minio/minio.service';


@Controller('report')
export class ReportController {
  private readonly bucket: string;

  constructor(
    private readonly reportService: ReportService,
    private readonly configService: ConfigService,
    private readonly minioService: MinIOService,
  ) {
    this.bucket = this.configService.get('MINIO_BUCKET');
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateReportDto, @Req() req: any) {
    try {
      const user_id = req.user.id;
      return await this.reportService.create({
        ...body,
        user_id,
      });
    } catch (err: any) {
      console.error('❌ Error creating report:', err);
      throw new BadRequestException(err.message);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('status') status: string,
    @Query('type') type: string,
    @Query('priority') priority: string,
    @Query('courseId') courseId: string,
    @Query('search') search: string,
    @Req() req: any,
  ) {
    const filters: any = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
    };

    if (status) filters.status = parseInt(status);
    if (type) filters.report_type = parseInt(type);
    if (priority) filters.priority = parseInt(priority);
    if (courseId) filters.course_id = courseId;
    if (search) filters.search = search;

    // If user is not admin, only show their reports
    const user = await this.getUser(req.user.id);
    if (user?.type !== 'admin') {
      filters.user_id = req.user.id;
    }

    return await this.reportService.findAll(filters);
  }

  @Get('my-reports')
  @UseGuards(JwtAuthGuard)
  async findMyReports(
    @Query('courseId') courseId: string,
    @Query('status') status: string,
    @Req() req: any,
  ) {
    const filters: any = {};
    if (status) filters.status = parseInt(status);

    return await this.reportService.findByUser(req.user.id,courseId, filters);
  }

  @Get('statistics')
  @UseGuards(JwtAuthGuard)

  async getStatistics(@Query('period') period: string) {
    return await this.reportService.getStatistics(
      period as 'day' | 'week' | 'month' | 'year',
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Req() req: any) {
    const report = await this.reportService.findOne(id);
    
    // Check permissions
    const user = await this.getUser(req.user.id);
    if (user?.type !== 'admin' && report.user_id !== req.user.id) {
      throw new BadRequestException('Bạn không có quyền xem báo cáo này');
    }

    return report;
  }

  @Put(':id/status')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateReportStatusDto,
    @Req() req: any,
  ) {
    return await this.reportService.updateStatus(id, req.user.id, body);
  }

  @Post(':id/comments')
  @UseGuards(JwtAuthGuard)
  async addComment(
    @Param('id') id: string,
    @Body() body: AddReportCommentDto,
    @Req() req: any,
  ) {
    return await this.reportService.addComment(id, req.user.id, body);
  }

  @Get(':id/comments')
  @UseGuards(JwtAuthGuard)
  async getComments(@Param('id') id: string, @Req() req: any) {
    const report = await this.reportService.findOne(id);
    
    // Check permissions
    const user = await this.getUser(req.user.id);
    if (user?.type !== 'admin' && report.user_id !== req.user.id) {
      throw new BadRequestException('Bạn không có quyền xem bình luận này');
    }

    return await this.reportService.getComments(id);
  }

  @Post('upload-screenshot')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'screenshots', maxCount: 5 },
    ]),
  )
  async uploadScreenshot(
    @UploadedFiles() files: { screenshots?: Express.Multer.File[] },
  ) {
    if (!files?.screenshots || files.screenshots.length === 0) {
      throw new BadRequestException('No screenshots uploaded');
    }

    const urls = [];

    for (const file of files.screenshots) {
      if (!file.buffer || file.buffer.length === 0) {
        throw new BadRequestException('File buffer is empty');
      }

      try {
        const prefix = 'reports';
        const result = await this.minioService.smartUploadParallel(file, this.bucket, prefix);
        
        console.log('✅ Upload result:', result);
        urls.push(result.url);
      } catch (error: any) {
        console.error('❌ Upload failed:', error);
        throw new BadRequestException('Failed to upload screenshot: ' + error.message);
      }
    }

    return {
      urls,
    };
  }

  private async getUser(userId: string) {
    // Fetch user to check type
    // This should be moved to a user service
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    return prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, type: true },
    });
  }
}