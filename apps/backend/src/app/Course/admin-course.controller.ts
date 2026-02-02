import { Controller, Get, Post, Put, Delete, Param, Query, Body, HttpCode, HttpStatus, NotFoundException, Logger, Res, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { UpdateCourseDto } from './dto/update-course.dto';
import { MinIOService } from '../minio/minio.service';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { AdminCourseService, CourseFilterDto } from './admin-course.service';

@Controller('admin/courses')
export class AdminCoursesController {
  private readonly logger = new Logger(AdminCoursesController.name);
  private readonly minIOService = new MinIOService(this.configService);

  constructor(
    private readonly adminCourseService: AdminCourseService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  async getAllForAdmin(@Query('page') page?: string, @Query('pageSize') pageSize?: string, @Query('search') search?: string, @Query('includeDeleted') includeDeleted?: string) {
    const filters: CourseFilterDto = {
      page: page ? parseInt(page) : 1,
      pageSize: pageSize ? parseInt(pageSize) : 20,
      search: search || undefined,
      includeDeleted: includeDeleted === 'true',
    };

    return await this.adminCourseService.findAllForAdmin(filters);
  }

  @Get(':courseId/full-details')
  async getCourseFullDetails(@Param('courseId') id: string) {
    const course = await this.adminCourseService.findByCourseId(id);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const sections = await this.adminCourseService.getSectionsWithLessons(id);

    return {
      ...course,
      sections: sections.map((section) => ({
        ...section,
        lessons: section.lessons || [],
      })),
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    AnyFilesInterceptor({
      fileFilter: (req, file, cb) => {
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024 * 1024,
      },
    }),
  )
  async createCourse(@Body() dto: any, @UploadedFiles() files: Express.Multer.File[]) {
    this.logger.log(`Creating course with files: ${files.map((f) => f.fieldname).join(', ')}`);
    return this.adminCourseService.createCourseWithFiles(dto, files);
  }

  @Put(':courseId')
  async updateCourse(@Param('courseId') id: string, @Body() dto: UpdateCourseDto) {
    return this.adminCourseService.updateCourse(id, dto);
  }

  @Delete(':courseId/soft')
  async softDeleteCourse(@Param('courseId') id: string) {
    return this.adminCourseService.softDeleteCourse(id);
  }

  @Delete(':courseId/hard')
  async hardDeleteCourse(@Param('courseId') id: string) {
    return this.adminCourseService.hardDeleteCourse(id);
  }

  @Put(':courseId/restore')
  async restoreCourse(@Param('courseId') id: string) {
    return this.adminCourseService.restoreCourse(id);
  }

  @Put(':courseId/full')
  @UseInterceptors(
    AnyFilesInterceptor({
      fileFilter: (req, file, cb) => {
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024 * 1024, // 2GB
      },
    }),
  )
  async updateCourseFull(@Param('courseId') id: string, @Body() dto: any, @UploadedFiles() files: Express.Multer.File[]) {
    this.logger.log(`Updating course ${id} with files: ${files.map((f) => f.fieldname).join(', ')}`);
    return this.adminCourseService.updateCourseFullWithFiles(id, dto, files);
  }

  @Post('bulk-soft-delete')
  async bulkSoftDelete(@Body() data: { ids: string[] }) {
    return await this.adminCourseService.bulkSoftDeleteCourses(data.ids);
  }

  @Post('bulk-hard-delete')
  async bulkHardDelete(@Body() data: { ids: string[] }) {
    return await this.adminCourseService.bulkHardDeleteCourses(data.ids);
  }

  @Get('file/:bucket/*')
  async viewFile(@Param('bucket') bucket: string, @Param() params, @Res() res: Response) {
    const key = params['0'];
    try {
      const stream = await this.minIOService.getFileStream(bucket, key);
      stream.getStream().pipe(res);
    } catch (err) {
      this.logger.error(`Error viewing file from MinIO: ${bucket}/${key}`, err);
      res.status(404).send('File not found');
    }
  }

  @Get('select')
  getCoursesForSelect() {
    return this.adminCourseService.findForSelect();
  }
}
