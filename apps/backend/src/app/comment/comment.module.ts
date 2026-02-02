import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { ConfigModule } from '@nestjs/config';
import { MinIOService } from '../minio/minio.service';

@Module({
  imports: [ConfigModule],
  controllers: [CommentController],
  providers: [CommentService, MinIOService],
  exports: [CommentService],
})
export class CommentModule {}
