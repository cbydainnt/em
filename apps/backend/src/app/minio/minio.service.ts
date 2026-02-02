import { Injectable, StreamableFile, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command, CompleteMultipartUploadCommand, CreateMultipartUploadCommand, UploadPartCommand, AbortMultipartUploadCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';
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
export class MinIOService {
  [x: string]: any;
  private s3: S3Client;
  private bucket: string;
  private readonly logger = new Logger(MinIOService.name);

  private readonly MULTIPART_THRESHOLD = 100 * 1024 * 1024; // 100MB
  private readonly PART_SIZE = 50 * 1024 * 1024; // 50MB mỗi part
  private readonly CONCURRENT_PARTS = 5;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      region: 'us-east-1', // MinIO không cần region thực
      endpoint: `http${this.configService.get('MINIO_USE_SSL') === 'true' ? 's' : ''}://${this.configService.get('MINIO_ENDPOINT')}:${this.configService.get('MINIO_PORT')}`,
      credentials: {
        accessKeyId: this.configService.get('MINIO_ACCESS_KEY'),
        secretAccessKey: this.configService.get('MINIO_SECRET_KEY'),
      },
      forcePathStyle: true, // bắt buộc với MinIO
    });

    this.bucket = this.configService.get('MINIO_BUCKET');
  }

  private generateFileKey(originalName: string, prefix: string): string {
    const sanitized = originalName
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const ext = sanitized.split('.').pop();
    const filename = `${uuidv4()}.${ext}`;
    return prefix ? `${prefix}/${filename}` : filename;
  }

  async uploadFile(file: Express.Multer.File, bucket: string = this.bucket, prefix = '') {
    const key = this.generateFileKey(file.originalname, prefix);

    this.logger.log(`📤 Uploading file: ${key} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);

    try {
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      await this.s3.send(command);

      this.logger.log(`✅ Upload success: ${key}`);

      return {
        bucket,
        key,
        url: `${bucket}/${key}`,
        originalName: file.originalname,
        size: file.size,
        mimeType: file.mimetype,
      };
    } catch (error) {
      this.logger.error(`❌ Upload failed: ${key}`, error);
      throw error;
    }
  }

  async uploadLargeFileOptimized(file: Express.Multer.File, bucket: string = this.bucket, prefix = '') {
    const key = this.generateFileKey(file.originalname, prefix);

    this.logger.log(`🚀 Starting PARALLEL multipart upload: ${key} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);

    let uploadId: string | undefined;

    try {
      // Create multipart upload
      const createCommand = new CreateMultipartUploadCommand({
        Bucket: bucket,
        Key: key,
        ContentType: file.mimetype,
      });

      const { UploadId } = await this.s3.send(createCommand);
      uploadId = UploadId;

      // Chia file thành parts
      const buffer = file.buffer;
      const totalParts = Math.ceil(buffer.length / this.PART_SIZE);
      const parts: any[] = [];

      this.logger.log(`📦 Total parts: ${totalParts}`);

      // Upload parts song song với concurrency control
      for (let i = 0; i < totalParts; i += this.CONCURRENT_PARTS) {
        const batch: Promise<any>[] = [];

        // Tạo batch uploads
        for (let j = i; j < Math.min(i + this.CONCURRENT_PARTS, totalParts); j++) {
          const partNumber = j + 1;
          const start = j * this.PART_SIZE;
          const end = Math.min(start + this.PART_SIZE, buffer.length);
          const partBuffer = buffer.slice(start, end);

          batch.push(this.uploadSinglePart(bucket, key, uploadId, partNumber, partBuffer, totalParts));
        }

        // Upload batch cùng lúc
        const batchResults = await Promise.all(batch);
        parts.push(...batchResults);

        this.logger.log(`✅ Batch completed: ${parts.length}/${totalParts} parts`);
      }

      // Complete multipart upload
      const completeCommand = new CompleteMultipartUploadCommand({
        Bucket: bucket,
        Key: key,
        UploadId: uploadId,
        MultipartUpload: { Parts: parts },
      });

      await this.s3.send(completeCommand);

      this.logger.log(`✅ Parallel multipart upload complete: ${key}`);

      return {
        bucket,
        key,
        url: `${bucket}/${key}`,
        originalName: file.originalname,
        size: file.size,
        mimeType: file.mimetype,
      };
    } catch (error: any) {
      this.logger.error(`❌ Parallel multipart upload failed: ${key}`, error);

      if (uploadId) {
        try {
          await this.s3.send(
            new AbortMultipartUploadCommand({
              Bucket: bucket,
              Key: key,
              UploadId: uploadId,
            }),
          );
          this.logger.log(`🔄 Aborted multipart upload: ${uploadId}`);
        } catch (abortError) {
          this.logger.error(`❌ Failed to abort multipart upload`, abortError);
        }
      }

      throw error;
    }
  }

  private async uploadSinglePart(bucket: string, key: string, uploadId: string, partNumber: number, partBuffer: Buffer, totalParts: number) {
    this.logger.log(`📤 Uploading part ${partNumber}/${totalParts} (${(partBuffer.length / 1024 / 1024).toFixed(2)}MB)`);

    const command = new UploadPartCommand({
      Bucket: bucket,
      Key: key,
      PartNumber: partNumber,
      UploadId: uploadId,
      Body: partBuffer,
    });

    const { ETag } = await this.s3.send(command);

    return {
      ETag,
      PartNumber: partNumber,
    };
  }

  /**
   * 🎯 Smart upload với parallel optimization
   */
  async smartUploadParallel(file: Express.Multer.File, bucket: string = this.bucket, prefix = '') {
    if (file.size >= this.MULTIPART_THRESHOLD) {
      this.logger.log(`🔍 Large file (${(file.size / 1024 / 1024).toFixed(2)}MB), using PARALLEL multipart`);
      return this.uploadLargeFileOptimized(file, bucket, prefix);
    }

    this.logger.log(`🔍 Small file (${(file.size / 1024 / 1024).toFixed(2)}MB), using single upload`);
    return this.uploadFile(file, bucket, prefix);
  }

  async deleteFileByUrl(fileUrl: string, bucket: string = this.bucket): Promise<void> {
    if (!fileUrl) return;
    let key = fileUrl;

    // Trích xuất key từ URL
    if (fileUrl.includes('http')) {
      const urlParts = fileUrl.split('/');
      const bucketIndex = urlParts.findIndex((part) => part === bucket);
      if (bucketIndex !== -1) {
        key = urlParts.slice(bucketIndex + 1).join('/');
      }
    } else if (fileUrl.startsWith(bucket + '/')) {
      key = fileUrl.substring(bucket.length + 1);
    }

    await this.deleteFile(bucket, key);
    console.log(`✅ Deleted file from MinIO: ${bucket}/${key}`);
  }

  async uploadBase64Image(base64Data: string, key?: string, bucket: string = this.bucket) {
    // Tách bỏ header 'data:image/png;base64,...'
    const matches = base64Data.match(/^data:(.+);base64,(.+)$/);
    if (!matches) throw new Error('Invalid base64 image data');

    const contentType = matches[1];
    const buffer = Buffer.from(matches[2], 'base64');
    const ext = contentType.split('/')[1];
    const mKey = key || `${Date.now()}.${ext}`;
    try {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: mKey,
          Body: buffer,
          ContentEncoding: 'base64',
          ContentType: contentType,
        }),
      );
    } catch (error) {
      console.log('uploadBase64Image', error);
    }

    return {
      key,
      // url: `/api/file/view/${bucket}/${mKey}`,
      url: `${bucket}/${mKey}`,
    };
  }

  async getFileStream(bucket: string = this.bucket, key: string) {
    const result = await this.s3.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );

    const stream = result.Body as Readable;
    return new StreamableFile(stream);
  }
  async getFileInfo(bucket: string, key: string) {
    const head = await this.s3.send(
      new HeadObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );
    return head;
  }

  async getPartialStream(bucket: string, key: string, range?: string) {
    const commandParams: any = {
      Bucket: bucket,
      Key: key,
    };

    if (range) {
      commandParams.Range = range;
    }

    const result = await this.s3.send(new GetObjectCommand(commandParams));
    return {
      stream: result.Body as Readable,
      contentLength: result.ContentLength,
      contentRange: result.ContentRange,
      contentType: result.ContentType,
      acceptRanges: result.AcceptRanges,
    };
  }

  async downloadFile(bucket: string = this.bucket, key: string) {
    const result = await this.s3.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );

    const stream = result.Body as Readable;
    return { stream, contentType: result.ContentType, key };
  }

  async deleteFile(bucket: string = this.bucket, key: string) {
    try {
      const command = new DeleteObjectCommand({ Bucket: bucket, Key: key });
      await this.s3.send(command);
      console.log('deleteFile file MinIO: ', bucket + '/' + key);
      return { success: true, bucket, key };
    } catch (error) {
      console.log('Error deleteFile MinIO', bucket + '/' + key);
    }
  }

  async listFiles(bucket: string = this.bucket, prefix = '') {
    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix,
      Delimiter: '/',
    });
    const result = await this.s3.send(command);
    return {
      folders: result.CommonPrefixes?.map((p) => p.Prefix),
      files: result.Contents?.map((c) => ({ key: c.Key, size: c.Size })),
    };
  }

  async getFullNameDocument(document_url: string) {
    try {
      let key = document_url;
      const doc = await prisma.document.findFirst({
        where: {
          document_url: {
            contains: key,
          },
        },
      });

      if (!doc) {
        return null;
      }

      return `${doc.document_name}.${doc.extension}`;
    } catch (error) {
      throw new Error('Không thể lấy tên file từ document_url');
    }
  }
}
