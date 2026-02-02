import { BadRequestException, Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MinIOService } from '../minio/minio.service';
import { ConfigService } from '@nestjs/config';
import { AdminBannerService } from './admin-banner.service';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('admin/banner')
export class AdminBannerController {
  private readonly minIOService = new MinIOService(this.configService);

  constructor(
    private readonly adminBannerService: AdminBannerService,
    private readonly configService: ConfigService,
  ) {}

  //This method just run 1 time to init default value of banner
  @Post('init')
  createInitialDefault() {
    return this.adminBannerService.createInitialDefaultBanner();
  }

  @Post('reset')
  resetToDefault(@Body('userId') userId: string) {
    return this.adminBannerService.resetToDefault(userId);
  }

  @Get('active')
  async getActiveBanner() {
    return this.adminBannerService.getActiveBanner();
  }

  @Put('upsert')
  async upsert(@Body() data: UpdateBannerDto, @Body('userId') userId: string, @Body('isReset') isReset: boolean = false) {
    return this.adminBannerService.upsertBanner(data, userId, isReset);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadBannerImage(@UploadedFile() file: Express.Multer.File, @Body('imageType') imageType: string) {
    if (!file || !file.buffer || file.buffer.length === 0) {
      throw new BadRequestException('No file or empty file uploaded');
    }

    const result = await this.adminBannerService.uploadFile(file, Number(imageType));
    return result;
  }

  @Put('update-background')
  async updateBackground(@Body('userId') userId: string, @Body('isReset') isReset: boolean = false, @Body('background_css') background_css?: string, @Body('main_image_src') main_image_src?: string) {
    return this.adminBannerService.updateBackground(userId, isReset, background_css, main_image_src);
  }
}
