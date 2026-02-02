import { Body, Controller, Put, Logger, UseGuards, Get, Param, Res, StreamableFile, Req, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from '../auth/login/jwt/jwt-auth.guard';
import { writeFile, mkdir } from 'fs/promises';
import { createReadStream, existsSync } from 'fs';
import { User } from '@/schema/user/user.model';
import type { Response } from 'express';
import { getMIMEType } from 'node-mime-types';
import { ConfigService } from '@nestjs/config';
import { convertToThumb, savetoThumb } from '@/utils';
import { MinIOService } from '../minio/minio.service';
import { UserType } from '@/enums/user';
//import { JwtAuthAdminGuard } from '../auth/login/jwt/jwt-auth-admin.guard';

@Controller('user')
export class UserController {
  private outputPath: string = '';
  private readonly logger = new Logger(UserController.name);
  private readonly minIOService = new MinIOService(this.configService);
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.outputPath = this.configService.get('OUTPUT_PATH') ?? join(process.cwd(), '../../');
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('course/:courseId/purchased')
  // async checkPurchased(@Param('courseId') courseId: string, @Req() req) {
  //   const userId = req.user.id;
  //   const purchased = await this.userService.checkUserCourse(userId, courseId);
  //   return { purchased };
  // }

  @Put('update')
  @UseGuards(JwtAuthGuard)
  async update(@Body() body: any): Promise<User> {
    return await this.updateBaseMinIO(body);
  }

  @Put('update-admin')
  @UseGuards(JwtAuthGuard)
  async updateAdmin(@Body() body: any): Promise<User> {
    return await this.updateBaseMinIO(body);
  }

  async updateBaseMinIO(body: any) {
    const filename = 'profile';
    if (body.avatar && body.avatar.includes('data:image')) {
      const extention = `.${body.avatarExt}`;
      const pathName = 'profile_image/' + filename + '-' + uuidv4() + extention;
      const image2 = await Buffer.from(body.avatar.replace(/^data:image\/[a-z]+;base64,/, ''), 'base64');
      const image = await convertToThumb(image2, 120, 120);
      try {
        const result = await this.minIOService.uploadBase64Image(image, pathName, this.configService.get('MINIO_BUCKET'));
        //   const destinationDirPath = join(this.outputPath, 'profile_image');
        //   const image = Buffer.from(body.avatar.replace(/^data:image\/[a-z]+;base64,/, ''), 'base64');
        //   if (!existsSync(destinationDirPath)) {
        //     await mkdir(destinationDirPath, { recursive: true });
        //   }
        //   //await writeFile(join(destinationDirPath, pathName), image as Uint8Array);
        //   await savetoThumb(join(destinationDirPath, pathName), image, 120, 120);

        body.avatar = result.url;
      } catch (error: any) {
        this.logger.error(error.message);
      }
    } else {
      body.avatar = 'old_avatar';
    }
    return await this.userService.update(body, body.id);
  }

  async updateBase(body: any) {
    const filename = 'profile';
    if (body.avatar && body.avatar.includes('data:image')) {
      const extention = `.${body.avatarExt}`;
      const pathName = filename + '-' + uuidv4() + extention;
      try {
        const destinationDirPath = join(this.outputPath, 'profile_image');
        const image = Buffer.from(body.avatar.replace(/^data:image\/[a-z]+;base64,/, ''), 'base64');
        if (!existsSync(destinationDirPath)) {
          await mkdir(destinationDirPath, { recursive: true });
        }
        //await writeFile(join(destinationDirPath, pathName), image as Uint8Array);
        await savetoThumb(join(destinationDirPath, pathName), image, 120, 120);
        body.avatar = pathName;
      } catch (error: any) {
        this.logger.error(error.message);
      }
    } else {
      body.avatar = 'old_avatar';
    }
    return await this.userService.update(body, body.id);
  }
  @Get('image/:bucket/*')
  async viewFile(@Param('bucket') bucket: string, @Param() params, @Res() res: Response) {
    const key = params['0'];
    try {
      const stream = await this.minIOService.getFileStream(bucket, key);
      stream.getStream().pipe(res);
    } catch (err) {
      console.log('Err View file MinIO: ', bucket + '/' + key);
    }
  }

  // @Get('image/:file')
  // async getImageView(@Param('file') file: string, @Res({ passthrough: true }) res: Response) {
  //   res.set({
  //     'Content-Type': 'text/html',
  //   });
  //   try {
  //     if (file) {
  //       res.set({
  //         'Content-Type': getMIMEType(file),
  //       });
  //       const destinationDirPath = join(this.outputPath, 'profile_image', file);
  //       if (!existsSync(destinationDirPath)) {
  //         return null;
  //       }
  //       const fileData = createReadStream(destinationDirPath);
  //       return new StreamableFile(fileData);
  //     }
  //     return null;
  //   } catch {
  //     return null;
  //   }
  // }

  @Get('count-user-by-courseId/:courseId')
  async countUserByCourseId(@Param('courseId') courseId: string) {
    return await this.userService.countUserByCourseId(courseId);
  }

  @Get('check-course-purchase/:courseId')
  @UseGuards(JwtAuthGuard)
  async checkCoursePurchase(@Param('courseId') courseId: string, @Req() req) {
    const userId = req.user.id;
    const purchased = await this.userService.checkUserCoursePurchase(userId, courseId);
    return { purchased };
  }

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('type') type?: string, 
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 20,
  ) {
   
    let parsedType: UserType | undefined;
    if (type && ['user', 'student', 'admin', 'teacher'].includes(type)) {
      parsedType = type as UserType;
    }

    const filters = {
      search,
      type: parsedType, 
      page: Number(page),
      pageSize: Number(pageSize),
    };

    const [data, total] = await Promise.all([this.userService.findAll(filters), this.userService.count(filters)]);

    return {
      data: (data ?? []).map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        avatar: u.avatar,
        type: u.type,
      })),
      total,
    };
  }
}
