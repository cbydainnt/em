import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { MinIOService } from '../minio/minio.service';
import { ConfigService } from '@nestjs/config';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { BannerImageType } from '@/enums/enum';

@Injectable()
export class AdminBannerService {
  private readonly prisma = new PrismaClient();
  private bucket: string;

  constructor(
    private readonly minIOService: MinIOService,
    private readonly configService: ConfigService,
  ) {
    this.bucket = this.configService.get('MINIO_BUCKET');
  }

  async createInitialDefaultBanner() {
    const count = await this.prisma.systemBannerConfig.count();

    if (count > 0) {
      throw new BadRequestException('System banner already initialized');
    }

    return this.prisma.systemBannerConfig.create({
      data: {
        title_segments: JSON.stringify([
          {
            id: '1',
            text: 'Học Tiếng Anh Thông Minh, ',
            color: '#ffffff',
            font_size: 46,
            font_weight: 700,
            font_family: 'Spartan, cursive',
          },
          {
            id: '2',
            text: 'tiến bộ',
            color: 'rgb(238, 74, 98)',
            font_size: 46,
            font_weight: 700,
            font_family: 'Spartan, cursive',
          },
          {
            id: '3',
            text: ' rõ từng ngày',
            color: '#ffffff',
            font_size: 46,
            font_weight: 700,
            font_family: 'Spartan, cursive',
          },
        ]),
        description_config: JSON.stringify({
          text: 'Khám phá khóa học đa dạng, từ cơ bản đến nâng cao, giúp bạn phát triển kỹ năng nghe, nói, đọc, viết một cách tự tin.',
          color: '#ffffff',
          font_size: 18,
          font_family: 'Poppins, cursive',
        }),
        background_css: 'linear-gradient(-90deg, rgb(49,185,120) 0%, rgb(26,182,157) 100%)',

        main_image_src: 'englishmaster/system_banner/default_main_image_src.png',
        main_floating_image_src: 'englishmaster/system_banner/default_main_floating_image_src.png',
        title_decor_image_src: 'englishmaster/system_banner/default_title_decor_image_src.png',
        button_decor_image_src: 'englishmaster/system_banner/default_button_decor_image_src.png',

        show_action_button: true,
        action_button_text: 'Tìm khóa học',
        action_button_link: '/tat-ca-khoa-hoc',

        is_default: true,
        is_active: true,
      },
    });
  }

  async resetToDefault(userId: string) {
    const defaultConfig = await this.prisma.systemBannerConfig.findFirst({
      where: { is_default: true },
    });

    if (!defaultConfig) {
      throw new Error('Default banner config not found');
    }

    await this.prisma.systemBannerConfig.updateMany({
      data: { is_active: false },
    });

    return this.prisma.systemBannerConfig.update({
      where: { id: defaultConfig.id },
      data: {
        is_active: true,
        updated_by: userId,
      },
    });
  }

  async upsertBanner(data: UpdateBannerDto, userId: string, isReset = false) {
    if (isReset) {
      const defaultBanner = await this.prisma.systemBannerConfig.findFirst({
        where: { is_default: true },
      });

      if (!defaultBanner) {
        throw new BadRequestException('Default banner not found');
      }

      await this.prisma.systemBannerConfig.updateMany({
        where: { is_active: true },
        data: { is_active: false },
      });

      const activatedBanner = await this.prisma.systemBannerConfig.update({
        where: { id: defaultBanner.id },
        data: { is_active: true, updated_by: userId },
      });

      return {
        ...activatedBanner,
        title_segments: activatedBanner.title_segments && typeof activatedBanner.title_segments === 'string' ? JSON.parse(activatedBanner.title_segments) : activatedBanner.title_segments,
        description_config: activatedBanner.description_config && typeof activatedBanner.description_config === 'string' ? JSON.parse(activatedBanner.description_config) : activatedBanner.description_config,
      };
    } else {
      const customerBanner = await this.prisma.systemBannerConfig.findFirst({
        where: { is_default: false },
      });

      await this.prisma.systemBannerConfig.updateMany({
        data: { is_active: false },
      });

      if (!customerBanner) {
        const created = await this.prisma.systemBannerConfig.create({
          data: {
            ...this.buildBannerPrismaData(data, userId),
            is_default: false,
          },
        });
        return this.parseBannerResult(created);
      }

      try {
        const updated = await this.prisma.systemBannerConfig.update({
          where: { id: customerBanner.id },
          data: this.buildBannerPrismaData(data, userId),
        });
        //return this.parseBannerResult(updated);
        console.log('updated có giá trị: ', updated);
        return {
          ...updated,
          title_segments: updated.title_segments ? JSON.parse(updated.title_segments as string) : null,

          description_config: updated.description_config ? JSON.parse(updated.description_config as string) : null,

          main_floating_image_config: updated.main_floating_image_config ? JSON.parse(updated.main_floating_image_config as string) : null,
        };
      } catch (error) {
        throw error;
      }
    }
  }

  IMAGE_TYPE_FOLDER_MAP: Record<number, string> = {
    1: 'main',
    2: 'floating',
    3: 'title_decor',
    4: 'button_decor',
  };

  async uploadFile(file: Express.Multer.File, imageType: BannerImageType) {
    try {
      const folder = this.IMAGE_TYPE_FOLDER_MAP[imageType];

      if (!folder) {
        throw new BadRequestException('Invalid imageType');
      }

      const prefix = `system_banner/${folder}`;
      const lstFile = await this.minIOService.listFiles(this.bucket, prefix + '/');
      const filesToDelete = (lstFile.files || []).filter((f: any) => !f.key.includes('default'));

      for (const file of filesToDelete) {
        await this.minIOService.deleteFile(this.bucket, file.key);
      }
      const result = await this.minIOService.smartUploadParallel(file, this.bucket, prefix);

      return {
        image_url: result.url,
        bucket: result.bucket,
        key: result.key,
        size: result.size,
      };
    } catch (error: any) {
      throw new BadRequestException('Failed to upload image: ' + error.message);
    }
  }

  async getActiveBanner() {
    let banner = await this.prisma.systemBannerConfig.findFirst({
      where: {
        is_active: true,
      },
      orderBy: {
        updated_at: 'desc',
      },
    });

    // fallback to default
    if (!banner) {
      banner = await this.prisma.systemBannerConfig.findFirst({
        where: {
          is_default: true,
        },
      });
    }

    if (!banner) {
      throw new BadRequestException('No banner configuration found');
    }

    if (banner.title_segments && typeof banner.title_segments === 'string') {
      banner.title_segments = JSON.parse(banner.title_segments);
    }
    if (banner.description_config && typeof banner.description_config === 'string') {
      banner.description_config = JSON.parse(banner.description_config);
    }

    return banner;
  }

  private buildBannerPrismaData(data: UpdateBannerDto, userId: string) {
    console.log('data có giá trị:', data);
    console.log('typeof main_floating_image_config:', typeof data.main_floating_image_config);
    return {
      title_segments: data.title_segments ? JSON.stringify(data.title_segments) : null,

      description_config: data.description_config ? JSON.stringify(data.description_config) : null,

      main_floating_image_config: data.main_floating_image_config ? JSON.stringify(data.main_floating_image_config) : null,

      background_css: data.background_css ?? null,
      main_image_src: data.main_image_src ?? null,
      main_floating_image_src: data.main_floating_image_src ?? null,
      title_decor_image_src: data.title_decor_image_src ?? null,
      button_decor_image_src: data.button_decor_image_src ?? null,

      show_action_button: data.show_action_button ?? true,
      action_button_text: data.action_button_text ?? null,
      action_button_link: data.action_button_link ?? null,

      is_active: true,
      updated_by: userId,
    };
  }

  async updateBackground(userId: string, isReset: boolean, background_css?: string, main_image_src?: string) {
    const [customBanner, defaultBanner] = await this.prisma.$transaction([this.prisma.systemBannerConfig.findFirst({ where: { is_default: false } }), this.prisma.systemBannerConfig.findFirst({ where: { is_default: true } })]);

    if (!customBanner || !defaultBanner) {
      throw new Error('Banners not found');
    }

    if (!isReset) {
      // transaction update
      return this.prisma.$transaction([
        this.prisma.systemBannerConfig.update({
          where: { id: customBanner.id },
          data: {
            background_css,
            main_image_src,
            is_active: true,
            updated_by: userId,
            updated_at: new Date(),
          },
        }),
        this.prisma.systemBannerConfig.update({
          where: { id: defaultBanner.id },
          data: {
            is_active: false,
          },
        }),
      ]);
    } else {
      return this.prisma.$transaction([
        this.prisma.systemBannerConfig.update({
          where: { id: customBanner.id },
          data: {
            is_active: false,
            updated_by: userId,
            updated_at: new Date(),
          },
        }),
        this.prisma.systemBannerConfig.update({
          where: { id: defaultBanner.id },
          data: {
            is_active: true,
          },
        }),
      ]);
    }
  }

  private parseBannerResult(banner: any) {
    return {
      ...banner,
      title_segments: banner.title_segments ? JSON.parse(banner.title_segments as string) : null,

      description_config: banner.description_config ? JSON.parse(banner.description_config as string) : null,

      main_floating_image_config: banner.main_floating_image_config ? JSON.parse(banner.main_floating_image_config as string) : null,
    };
  }
}
