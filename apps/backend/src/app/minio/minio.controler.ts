import { Controller, Post, Get, Delete, Param, UploadedFile, UseInterceptors, Res, Req, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { MinIOService } from './minio.service';
import { getMIMEType } from 'node-mime-types';

@Controller('file')
export class MinIOController {
  constructor(private readonly minIOService: MinIOService) {}

  // 📤 Upload file
  // POST /file/upload/:bucket/*
  @Post('upload/:bucket/*')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Param('bucket') bucket: string, @Param() params, @UploadedFile() file: Express.Multer.File) {
    const prefix = params['0'] || '';
    return this.minIOService.uploadFile(file, bucket, prefix);
  }

  // 🎥 View file
  // GET /file/view/:bucket/*
  @Get('view/:bucket/*')
  async streamVideo(@Param('bucket') bucket: string, @Param() params, @Req() req: Request, @Res() res: Response) {
    const key = params['0'];

    const mimeType = getMIMEType(key)?.toLowerCase() || 'application/octet-stream';

    const range = req.headers['range'] as string | undefined;

    // Nếu là video và có Range → xử lý streaming
    if (mimeType.includes('video') && range) {
      console.log('streamWithRange:', range);
      return await this.streamWithRange(bucket, key, range, mimeType, res);
    }
    console.log('streamWithoutRange:', range);
    // Nếu không phải video hoặc client không gửi Range → trả file thường
    return await this.streamWithoutRange(bucket, key, mimeType, res);
  }

  // ----------------------------
  // Case 1: Streaming video với Range
  // ----------------------------
  private async streamWithRange(bucket: string, key: string, range: string, mimeType: string, res: Response) {
    const fileInfo = await this.minIOService.getFileInfo(bucket, key);
    const fileSize = fileInfo.ContentLength;

    // Parse range
    const [startStr, endStr] = range.replace(/bytes=/, '').split('-');
    const start = parseInt(startStr, 10);
    const end = endStr ? parseInt(endStr, 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    console.log(`Streaming bytes ${start}-${end} of ${fileSize}`);
    const partial = await this.minIOService.getPartialStream(bucket, key, `bytes=${start}-${end}`);

    // Set header chuẩn streaming MP4
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': mimeType,
      'Cache-Control': 'public, max-age=2592000',
    });

    partial.stream.pipe(res);
  }

  // ----------------------------
  // Case 2: Trả về file bình thường (image/audio/pdf/video không Range)
  // ----------------------------
  private async streamWithoutRange(bucket: string, key: string, mimeType: string, res: Response) {
    const filePart = await this.minIOService.getPartialStream(bucket, key);

    res.set({
      'Content-Type': mimeType,
      'Content-Length': filePart.contentLength,
      'Cache-Control': 'public, max-age=2592000',
    });

    filePart.stream.pipe(res);
  }

  @Get('download/:booket/*')
  async downloadFile(@Param('booket') booket: string, @Param() params, @Res() res: Response) {
    const key = params['0'];
    const filename = (await this.minIOService.getFullNameDocument(key)) || key;
    const { stream, contentType } = await this.minIOService.downloadFile(booket, key);
    res.set({
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
    });
    stream.pipe(res);
  }

  // ❌ Delete file
  // DELETE /file/delete/:bucket/*
  @Delete('delete/:bucket/*')
  async deleteFile(@Param('bucket') bucket: string, @Param() params) {
    const key = params['0'];
    return this.minIOService.deleteFile(bucket, key);
  }

  // 📂 List folder
  // GET /file/list/:bucket/*
  @Get('list/:bucket/*')
  async listFiles(@Param('bucket') bucket: string, @Param() params) {
    const prefix = params['0'] || '';
    return this.minIOService.listFiles(bucket, prefix);
  }
}
