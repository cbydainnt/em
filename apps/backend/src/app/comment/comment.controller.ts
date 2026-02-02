import { Controller, Get, Post, Put, Delete, Body, Param, BadRequestException, Req, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/login/jwt/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { MinIOService } from '../minio/minio.service';

@Controller('comment')
export class CommentController {
  private readonly bucket: string;

  constructor(
    private readonly commentService: CommentService,
    private readonly configService: ConfigService,
    private readonly minioService: MinIOService,
  ) {
    this.bucket = this.configService.get('MINIO_BUCKET');
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateCommentDto, @Req() req: any) {
    try {
      const user_id = req.user.id;
      return await this.commentService.create({
        ...body,
        user_id,
      });
    } catch (err: any) {
      console.error('❌ Error creating comment:', err);
      throw new BadRequestException(err.message);
    }
  }

  @Post('reply/:parent_id')
  @UseGuards(JwtAuthGuard)
  async reply(@Param('parent_id') parent_id: string, @Body() body: CreateCommentDto, @Req() req: any) {
    const user_id = req.user.id;
    const parentComment = await this.commentService.findOne(parent_id);
    const rootParentId = parentComment?.parent_id || parent_id;

    return await this.commentService.create({
      ...body,
      user_id,
      parent_id: rootParentId,
    });
  }

  @Get('course/:course_id')
  async getByCourse(@Param('course_id') course_id: string) {
    return await this.commentService.findByCourse(course_id);
  }

  @Get('lesson/:lesson_id')
  async getByLesson(@Param('lesson_id') lesson_id: string) {
    return await this.commentService.findByLesson(lesson_id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateCommentDto, @Req() req) {
    const user_id = req.user.id;
    return this.commentService.update(id, user_id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req) {
    const user_id = req.user.id;

    const comment = await this.commentService.findOne(id);

    if (comment && comment.image_url) {
      try {
        await this.minioService.deleteFileByUrl(comment.image_url, this.bucket);
        console.log(`✅ Deleted comment image from MinIO: ${comment.image_url}`);
      } catch (error) {
        console.error('❌ Failed to delete comment image from MinIO:', error);
      }
    }

    return this.commentService.delete(id, user_id);
  }

  @Post('upload-image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadCommentImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    console.log('📤 Uploading comment image:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      bufferLength: file.buffer?.length, 
    });

    if (!file.buffer || file.buffer.length === 0) {
      throw new BadRequestException('File buffer is empty');
    }

    try {
      const prefix = 'comments';

      const result = await this.minioService.smartUploadParallel(file, this.bucket, prefix);

      console.log('✅ Upload result:', result);

      return {
        image_url: result.url,
        bucket: result.bucket,
        key: result.key,
        size: result.size,
      };
    } catch (error: any) {
      console.error('❌ Upload failed:', error);
      throw new BadRequestException('Failed to upload image: ' + error.message);
    }
  }
}
