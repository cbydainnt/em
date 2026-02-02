import { Injectable, Logger, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UserService } from '../user/user.service';
import { MinIOService } from '../minio/minio.service';
import { ConfigService } from '@nestjs/config';
import { Course } from '@prisma/client';

// const prisma = new PrismaClient({
//   errorFormat: 'colorless',
//   log: [
//     {
//       emit: 'event',
//       level: 'query',
//     },
//   ],
//   transactionOptions: {
//     maxWait: 60000,
//     timeout: 300000,
//   },
// });

interface UploadedFile {
  url: string;
  type: 'thumbnail' | 'video' | 'document';
  key: string;
  sectionIndex?: number;
  lessonIndex?: number;
  documentIndex?: number;
}

export interface CourseFilterDto {
  page?: number;
  pageSize?: number;
  search?: string;
  includeDeleted?: boolean;
}

@Injectable()
export class AdminCourseService {
  private readonly logger = new Logger(AdminCourseService.name);
  private readonly userService = new UserService();
  private bucket: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly minIOService: MinIOService,
    private readonly configService: ConfigService,
  ) {
    this.bucket = this.configService.get('MINIO_BUCKET');
  }

  async findAllForAdmin(filters: CourseFilterDto): Promise<{ data: any[]; total: number }> {
    try {
      const page = filters.page || 1;
      const pageSize = filters.pageSize || 20;
      const skip = (page - 1) * pageSize;

      const where: any = {};

      if (filters.includeDeleted) {
        where.del_flg = true;
      } else {
        where.del_flg = false;
      }

      if (filters.search) {
        const searchTerm = filters.search.trim().toLowerCase();
        where.OR = [
          {
            course_name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ];
      }

      const [courses, total] = await Promise.all([
        this.prisma.course.findMany({
          where,
          skip,
          take: pageSize,
          include: {
            ratingSummary: true,
            sections: {
              where: { del_flg: false },
              include: {
                lessons: {
                  where: { del_flg: false },
                },
              },
            },
          },
          orderBy: { updated_at: 'desc' },
        }),
        this.prisma.course.count({ where }),
      ]);

      const data = courses.map((course) => ({
        ...course,
        total_lessons: course.sections.reduce((sum, section) => sum + section.lessons.length, 0),
        total_duration: course.sections.reduce((sum, section) => {
          return sum + section.lessons.reduce((s, lesson) => s + (lesson.minutes || 0), 0);
        }, 0),
        avg_rating: course.ratingSummary?.avg_rating || 0,
        total_reviews: course.ratingSummary?.total_reviews || 0,
      }));

      return { data, total };
    } catch (error: any) {
      this.logger.error('Error fetching courses for admin', error);
      throw new InternalServerErrorException('Failed to fetch courses');
    }
  }

  async findByCourseId(course_id: string): Promise<any> {
    try {
      const course = await this.prisma.course.findUnique({
        where: { course_id },
        include: {
          ratingSummary: true,
          sections: {
            where: { del_flg: false },
            include: {
              lessons: {
                where: { del_flg: false },
                include: {
                  documents: true,
                },
                orderBy: { lesson_order: 'asc' },
              },
            },
            orderBy: { created_at: 'asc' },
          },
        },
      });

      if (!course) return null;

      const total_lessons = course.sections.reduce((sum, section) => sum + (section.lessons?.length || 0), 0);
      const total_duration = course.sections.reduce((sum, section) => {
        const sectionDuration = section.lessons?.reduce((s, lesson) => s + (lesson.minutes || 0), 0);
        return sum + sectionDuration;
      }, 0);

      const total_user = await this.userService.countUserByCourseId(course_id);

      return { ...course, total_lessons, total_duration, total_user };
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async getSectionsWithLessons(courseId: string) {
    return await this.prisma.section.findMany({
      where: {
        course_id: courseId,
        del_flg: false,
      },
      include: {
        lessons: {
          where: { del_flg: false },
          include: {
            documents: true,
            lesson_quizzes: {
              include: {
                quiz: {
                  select: {
                    quiz_id: true,
                    title: true,
                    duration_minutes: true,
                    total_questions: true,
                    difficulty_level: true,
                    passing_score: true,
                  },
                },
              },
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { lesson_order: 'asc' },
        },
      },
      orderBy: { created_at: 'asc' },
    });
  }

  async getCourseFullDetails(courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: { course_id: courseId },
      include: {
        ratingSummary: true,
        sections: {
          where: { del_flg: false },
          include: {
            lessons: {
              where: { del_flg: false },
              include: {
                documents: true,
                // 🆕 Include quizzes
                lesson_quizzes: {
                  include: {
                    quiz: {
                      select: {
                        quiz_id: true,
                        title: true,
                        duration_minutes: true,
                        total_questions: true,
                        difficulty_level: true,
                        passing_score: true,
                      },
                    },
                  },
                  orderBy: { order: 'asc' },
                },
              },
              orderBy: { lesson_order: 'asc' },
            },
          },
          orderBy: { created_at: 'asc' },
        },
      },
    });

    if (!course) return null;

    const total_lessons = course.sections.reduce((sum, section) => sum + (section.lessons?.length || 0), 0);

    const total_duration = course.sections.reduce((sum, section) => {
      const sectionDuration = section.lessons?.reduce((s, lesson) => s + (lesson.minutes || 0), 0);
      return sum + sectionDuration;
    }, 0);

    const total_user = await this.userService.countUserByCourseId(courseId);

    return {
      ...course,
      total_lessons,
      total_duration,
      total_user,
    };
  }

  private async resizeThumbnail(thumbnailBuffer: Buffer): Promise<Buffer> {
    try {
      const sharp = require('sharp');

      return await sharp(thumbnailBuffer)
        .resize(400, 230, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({
          quality: 100,
          progressive: true,
          mozjpeg: true,
          chromaSubsampling: '4:4:4',
        })
        .toBuffer();
    } catch (error) {
      this.logger.error('❌ Lỗi resize thumbnail, dùng ảnh gốc');
      return thumbnailBuffer;
    }
  }

  private async uploadFilesParallel(dto: any, files: Express.Multer.File[], existingCourse: any, uploadedFiles: UploadedFile[]) {
    const uploadResults: any = {};
    const uploadPromises: Promise<void>[] = [];

    try {
      // Upload thumbnail
      const thumbnailFile = files.find((f) => f.fieldname === 'thumbnail');
      if (thumbnailFile) {
        uploadPromises.push(
          (async () => {
            try {
              this.logger.log(`🖼️ Uploading thumbnail...`);

              if (existingCourse?.thumbnail) {
                await this.deleteFileFromMinIO(existingCourse.thumbnail);
              }

              const resizedBuffer = await this.resizeThumbnail(thumbnailFile.buffer);

              const resizedFile = {
                ...thumbnailFile,
                buffer: resizedBuffer,
                mimetype: 'image/jpeg',
              };

              const url = await this.minIOService.smartUploadParallel(resizedFile, this.bucket, 'course_thumbnails');
              uploadResults.thumbnailUrl = url.url;

              this.logger.log(`✅ Thumbnail uploaded`);
            } catch (error) {
              this.logger.error(`❌ Upload thumbnail failed`);
              throw error;
            }
          })(),
        );
      }

      if (dto.sections) {
        const sections = JSON.parse(dto.sections);

        for (let sIdx = 0; sIdx < sections.length; sIdx++) {
          const section = sections[sIdx];

          for (let lIdx = 0; lIdx < (section.lessons || []).length; lIdx++) {
            const lesson = section.lessons[lIdx];

            // 🔧 Xử lý video
            if (lesson._deleted_video && lesson.lesson_id && !lesson.lesson_id.startsWith('temp-')) {
              const existingLesson = existingCourse.sections?.flatMap((s: any) => s.lessons).find((l: any) => l.lesson_id === lesson.lesson_id);

              if (existingLesson?.lesson_video) {
                this.logger.log(`🗑️ Deleting video (marked as deleted): ${existingLesson.lesson_video}`);
                await this.deleteFileFromMinIO(existingLesson.lesson_video);
              }
            }

            // Upload video mới nếu có
            if (lesson.lesson_video_key) {
              const videoFile = files.find((f) => f.fieldname === lesson.lesson_video_key);
              if (videoFile) {
                uploadPromises.push(
                  (async () => {
                    try {
                      if (lesson.lesson_id && !lesson.lesson_id.startsWith('temp-')) {
                        const existingLesson = existingCourse.sections?.flatMap((s: any) => s.lessons).find((l: any) => l.lesson_id === lesson.lesson_id);

                        if (existingLesson?.lesson_video) {
                          this.logger.log(`🗑️ Deleting old video: ${existingLesson.lesson_video}`);
                          await this.deleteFileFromMinIO(existingLesson.lesson_video);
                        }
                      }

                      const result = await this.minIOService.smartUploadParallel(videoFile, this.bucket, 'lesson_videos');
                      uploadResults[lesson.lesson_video_key] = result.url;
                      uploadedFiles.push({
                        url: result.url,
                        type: 'video',
                        key: this.extractKeyFromUrl(result.url),
                        sectionIndex: sIdx,
                        lessonIndex: lIdx,
                      });
                    } catch (error: any) {
                      this.logger.error(`❌ Failed to upload video: ${error.message}`);
                      throw error;
                    }
                  })(),
                );
              }
            }

            // 🔧Xử lý documents
            if (lesson.documents) {
              for (let dIdx = 0; dIdx < lesson.documents.length; dIdx++) {
                const doc = lesson.documents[dIdx];

                // Xử lý document bị đánh dấu xóa
                if (doc._deleted && doc.document_id) {
                  const existingLesson = existingCourse.sections?.flatMap((s: any) => s.lessons).find((l: any) => l.lesson_id === lesson.lesson_id);

                  if (existingLesson) {
                    const existingDoc = existingLesson.documents?.find((d: any) => d.document_id === doc.document_id);
                    if (existingDoc?.document_url) {
                      this.logger.log(`🗑️ Deleting document: ${existingDoc.document_name}`);
                      await this.deleteFileFromMinIO(existingDoc.document_url);
                    }
                  }
                }

                // Upload document mới
                if (doc.document_url_key && !doc._deleted) {
                  const docFile = files.find((f) => f.fieldname === doc.document_url_key);
                  if (docFile) {
                    uploadPromises.push(
                      (async () => {
                        try {
                          const result = await this.minIOService.smartUploadParallel(docFile, this.bucket, 'lesson_documents');
                          uploadResults[doc.document_url_key] = result.url;
                          uploadedFiles.push({
                            url: result.url,
                            type: 'document',
                            key: this.extractKeyFromUrl(result.url),
                            sectionIndex: sIdx,
                            lessonIndex: lIdx,
                            documentIndex: dIdx,
                          });
                        } catch (error: any) {
                          this.logger.error(`❌ Failed to upload document: ${error.message}`);
                          throw error;
                        }
                      })(),
                    );
                  }
                }
              }
            }
          }
        }
      }

      // 🚀 CHẠY TẤT CẢ UPLOADS SONG SONG
      this.logger.log(`🚀 Starting parallel upload of ${uploadPromises.length} files...`);
      const overallStartTime = Date.now();
      await Promise.all(uploadPromises);
      const totalDuration = ((Date.now() - overallStartTime) / 1000).toFixed(2);
      this.logger.log(`✅ All ${uploadedFiles.length} files uploaded successfully in ${totalDuration}s`);

      return uploadResults;
    } catch (error) {
      this.logger.error('❌ Parallel upload failed, rolling back');
      await this.rollbackUploadedFiles(uploadedFiles);
      throw error;
    }
  }

  private extractKeyFromUrl(fileUrl: string): string {
    if (!fileUrl) return '';

    if (fileUrl.includes('http')) {
      const urlParts = fileUrl.split('/');
      const bucketIndex = urlParts.findIndex((part) => part === this.bucket);
      if (bucketIndex !== -1) {
        return urlParts.slice(bucketIndex + 1).join('/');
      }
    } else if (fileUrl.startsWith(this.bucket + '/')) {
      return fileUrl.substring(this.bucket.length + 1);
    }

    return fileUrl;
  }

  private async rollbackUploadedFiles(uploadedFiles: UploadedFile[]) {
    if (uploadedFiles.length === 0) return;

    this.logger.log(`🔄 Rolling back ${uploadedFiles.length} uploaded files`);

    const deletePromises = uploadedFiles.map(async (file) => {
      try {
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Delete timeout')), 10000));
        await Promise.race([this.deleteFileFromMinIO(file.url), timeoutPromise]);
        this.logger.log(`🗑️ Rollback deleted: ${file.key}`);
      } catch (error: any) {
        this.logger.error(`❌ Failed to rollback ${file.key}: ${error.message}`);
      }
    });

    await Promise.allSettled(deletePromises);
    this.logger.log(`✅ Rollback completed`);
  }

  private async deleteFileFromMinIO(fileUrl: string): Promise<void> {
    try {
      if (!fileUrl) return;
      await this.minIOService.deleteFileByUrl(fileUrl, this.bucket);
      this.logger.log(`✅ Deleted file from MinIO: ${fileUrl}`);
    } catch (error: any) {
      this.logger.error(`❌ Lỗi khi xóa file từ MinIO: ${error.message}`);
    }
  }

  private getFileExtension(urlOrFilename: string): string {
    if (!urlOrFilename) return '';

    let filename = urlOrFilename;

    if (urlOrFilename.includes('/')) {
      const withoutQuery = urlOrFilename.split('?')[0];
      filename = withoutQuery.split('/').pop() || '';
    }

    if (!filename) {
      filename = urlOrFilename;
    }

    const parts = filename.split('.');

    if (parts.length === 1 || (parts[0] === '' && parts.length === 2)) {
      return '';
    }

    const extension = parts.pop()?.toLowerCase() || '';

    const validExtensions = ['pdf', 'doc', 'docx', 'txt', 'ppt', 'pptx', 'xlsx', 'xls', 'zip', 'rar'];
    if (validExtensions.includes(extension)) {
      return extension;
    }

    return '';
  }

  async createCourseWithFiles(dto: any, files: Express.Multer.File[]): Promise<Course> {
    const uploadedFiles: UploadedFile[] = [];

    try {
      const existing = await this.prisma.course.findUnique({
        where: { course_name: dto.course_name },
      });

      if (existing) {
        throw new BadRequestException('Course name already exists');
      }

      const uploadResults = await this.uploadFilesParallel(dto, files, { sections: [] }, uploadedFiles);

      let thumbnailUrl = dto.thumbnail;
      const thumbnailFile = files.find((f) => f.fieldname === 'thumbnail');

      if (thumbnailFile && uploadResults.thumbnailUrl) {
        thumbnailUrl = uploadResults.thumbnailUrl;
      }

      const sections = dto.sections ? JSON.parse(dto.sections) : [];

      const createdCourse = await this.prisma.course.create({
        data: {
          course_name: dto.course_name,
          course_description: dto.course_description,
          target: dto.course_target,
          course_price: Number(dto.course_price),
          course_original_price: Number(dto.course_original_price),
          state: dto.state,
          thumbnail: thumbnailUrl,
          del_flg: dto.del_flg === 'true' || dto.del_flg === true,
          access_type: Number(dto.access_type) || 1,
          access_duration_months: dto.access_type === '1' ? Number(dto.access_duration_months) : null,
          access_expire_at: Number(dto.access_type) === 3 ? new Date(dto.access_expire_at) : null,
          sections: {
            create: sections.map((section: any, sectionIndex: number) => ({
              section_title: section.section_title,
              del_flg: false,
              lessons: {
                create:
                  section.lessons?.map((lesson: any, lessonIndex: number) => {
                    const videoKey = `lesson_video_${sectionIndex}_${lessonIndex}`;
                    const videoUrl = uploadResults[videoKey] || lesson.lesson_video || '';

                    const videoDuration = Number(lesson.video_duration) || 0;

                    // let quizDuration = 0;
                    // if (lesson.quizzes && lesson.quizzes.length > 0) {
                    //   lesson.quizzes.forEach((quiz: any) => {
                    //     quizDuration += Number(quiz.duration_minutes) || 0;
                    //   });
                    // }

                    //const totalMinutes = videoDuration + quizDuration;
                    const totalMinutes = videoDuration ;

                    return {
                      lesson_title: lesson.lesson_title,
                      lesson_type: Number(lesson.lesson_type) || 0,
                      lesson_video: videoUrl,
                      lesson_order: lessonIndex,
                      minutes: totalMinutes, // ✅ Tổng thời gian
                      video_duration: videoDuration, // ✅ Thời gian video riêng
                      access_type: Number(lesson.access_type) || 3,
                      del_flg: false,
                      // 🆕 Xử lý documents đúng cách
                      documents: {
                        create:
                          lesson.documents
                            ?.map((doc: any, docIndex: number) => {
                              const docKey = `lesson_doc_${sectionIndex}_${lessonIndex}_${docIndex}`;
                              const docUrl = uploadResults[docKey] || '';

                              // Chỉ tạo document nếu có URL (file đã upload thành công)
                              if (docUrl) {
                                const fileExtension = this.getFileExtension(docUrl);
                                return {
                                  document_url: docUrl,
                                  document_name: doc.document_name,
                                  extension: fileExtension,
                                  size: doc.size || 0,
                                  isDownloadable: doc.isDownloadable ?? true,
                                };
                              }
                              return null;
                            })
                            .filter(Boolean) || [],
                      },
                      // ✅ Thêm quizzes khi tạo lesson
                      lesson_quizzes: {
                        create:
                          lesson.quizzes?.map((quiz: any, idx: number) => ({
                            quiz_id: quiz.quiz_id,
                            order: idx,
                          })) || [],
                      },
                    };
                  }) || [],
              },
            })),
          },
        },
        include: {
          sections: {
            include: {
              lessons: {
                include: { documents: true, lesson_quizzes: true },
              },
            },
          },
        },
      });

      this.logger.log(`✅ Created course with parallel uploads: ${createdCourse.course_name}`);
      return createdCourse;
    } catch (error) {
      this.logger.error('❌ Failed to create course', error);

      if (uploadedFiles.length > 0) {
        await this.rollbackUploadedFiles(uploadedFiles);
      }

      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Failed to create course');
    }
  }

  async updateCourse(course_id: string, dto: UpdateCourseDto) {
    const existing = await this.prisma.course.findUnique({ where: { course_id } });
    if (!existing) throw new NotFoundException('Course not found');

    if (dto.course_name && dto.course_name !== existing.course_name) {
      const duplicateName = await this.prisma.course.findUnique({
        where: { course_name: dto.course_name },
      });

      if (duplicateName) {
        throw new BadRequestException('Course name already exists');
      }
    }

    return await this.prisma.course.update({
      where: { course_id },
      data: {
        course_name: dto.course_name ?? existing.course_name,
        course_description: dto.course_description ?? existing.course_description,
        target: dto.course_target ?? existing.target,
        course_price: dto.course_price ?? existing.course_price,
        course_original_price: dto.course_original_price ?? existing.course_original_price,
        state: dto.state ?? existing.state,
        thumbnail: dto.thumbnail ?? existing.thumbnail,
        updated_at: new Date(),
      },
    });
  }

  async softDeleteCourse(course_id: string): Promise<{ message: string }> {
    try {
      const course = await this.prisma.course.findUnique({ where: { course_id } });
      if (!course) throw new NotFoundException('Course not found');

      // 🔧 CASCADE SOFT DELETE
      await this.prisma.$transaction(async (tx) => {
        // Soft delete course
        await tx.course.update({
          where: { course_id },
          data: { del_flg: true, updated_at: new Date() },
        });

        // Soft delete tất cả sections
        await tx.section.updateMany({
          where: { course_id },
          data: { del_flg: true, updated_at: new Date() },
        });

        // Soft delete tất cả lessons thuộc course
        const sections = await tx.section.findMany({
          where: { course_id },
          select: { section_id: true },
        });

        const sectionIds = sections.map((s) => s.section_id);
        if (sectionIds.length > 0) {
          await tx.lesson.updateMany({
            where: { section_id: { in: sectionIds } },
            data: { del_flg: true, updated_at: new Date() },
          });
        }
      });

      return { message: 'Course and all related content soft deleted successfully' };
    } catch (error) {
      this.logger.error(`Error soft deleting course ${course_id}`, error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to soft delete course');
    }
  }

  async hardDeleteCourse(course_id: string): Promise<{ message: string }> {
    try {
      const course = await this.prisma.course.findUnique({
        where: { course_id },
        include: {
          sections: {
            include: {
              lessons: {
                include: {
                  documents: true,
                },
              },
            },
          },
        },
      });
      if (!course) throw new NotFoundException('Course not found');

      // 🔧 XÓA TẤT CẢ FILES TỪ MINIO TRƯỚC
      this.logger.log(`🗑️ Starting hard delete for course: ${course.course_name}`);

      // Xóa thumbnail
      if (course.thumbnail) {
        await this.deleteFileFromMinIO(course.thumbnail);
        this.logger.log(`✅ Deleted thumbnail`);
      }

      // Xóa tất cả videos và documents
      let deletedVideos = 0;
      let deletedDocs = 0;

      for (const section of course.sections) {
        for (const lesson of section.lessons) {
          // Xóa video
          if (lesson.lesson_video) {
            await this.deleteFileFromMinIO(lesson.lesson_video);
            deletedVideos++;
          }

          // Xóa documents
          for (const doc of lesson.documents) {
            if (doc.document_url) {
              await this.deleteFileFromMinIO(doc.document_url);
              deletedDocs++;
            }
          }
        }
      }

      this.logger.log(`✅ Deleted ${deletedVideos} videos and ${deletedDocs} documents from MinIO`);

      // 🔧 XÓA DATABASE RECORDS (cascade sẽ xóa documents)
      await this.prisma.$transaction(async (tx) => {
        // Xóa các relations
        await tx.userCourse.deleteMany({ where: { course_id } });
        await tx.comboCourse.deleteMany({ where: { course_id } });
        await tx.courseReview.deleteMany({ where: { course_id } });
        await tx.ratingSummary.deleteMany({ where: { course_id } });
        await tx.cartItem.deleteMany({ where: { course_id } });

        // Xóa sections (cascade sẽ xóa lessons và documents)
        await tx.section.deleteMany({ where: { course_id } });

        // Xóa course
        await tx.course.delete({ where: { course_id } });
      });

      this.logger.log(`✅ Course permanently deleted from database`);

      return {
        message: `Course permanently deleted (${deletedVideos} videos, ${deletedDocs} documents removed from storage)`,
      };
    } catch (error) {
      this.logger.error(`Error hard deleting course ${course_id}`, error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to hard delete course');
    }
  }

  async restoreCourse(course_id: string): Promise<{ message: string }> {
    try {
      const course = await this.prisma.course.findUnique({ where: { course_id } });
      if (!course) throw new NotFoundException('Course not found');

      await this.prisma.course.update({
        where: { course_id },
        data: { del_flg: false, updated_at: new Date() },
      });

      return { message: 'Course restored successfully' };
    } catch (error) {
      this.logger.error(`Error restoring course ${course_id}`, error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to restore course');
    }
  }

  async bulkSoftDeleteCourses(course_ids: string[]): Promise<{ message: string; count: number }> {
    try {
      const result = await this.prisma.course.updateMany({
        where: { course_id: { in: course_ids } },
        data: { del_flg: true, updated_at: new Date() },
      });

      return { message: 'Courses soft deleted successfully', count: result.count };
    } catch (error) {
      this.logger.error('Error bulk soft deleting courses', error);
      throw new InternalServerErrorException('Failed to bulk soft delete courses');
    }
  }

  async bulkHardDeleteCourses(course_ids: string[]): Promise<{ message: string; count: number }> {
    try {
      const courses = await this.prisma.course.findMany({
        where: { course_id: { in: course_ids } },
        include: {
          sections: {
            include: {
              lessons: {
                include: {
                  documents: true,
                },
              },
            },
          },
        },
      });

      for (const course of courses) {
        if (course.thumbnail) {
          await this.deleteFileFromMinIO(course.thumbnail);
        }

        for (const section of course.sections) {
          for (const lesson of section.lessons) {
            if (lesson.lesson_video) await this.deleteFileFromMinIO(lesson.lesson_video);
            if (lesson.documents.length > 0) {
              await Promise.all(
                lesson.documents.map(async (document) => {
                  await this.deleteFileFromMinIO(document.document_url);
                }),
              );
            }
          }
        }
      }

      await this.prisma.section.deleteMany({ where: { course_id: { in: course_ids } } });
      await this.prisma.userCourse.deleteMany({ where: { course_id: { in: course_ids } } });
      await this.prisma.comboCourse.deleteMany({ where: { course_id: { in: course_ids } } });
      await this.prisma.courseReview.deleteMany({ where: { course_id: { in: course_ids } } });
      await this.prisma.ratingSummary.deleteMany({ where: { course_id: { in: course_ids } } });

      const result = await this.prisma.course.deleteMany({
        where: { course_id: { in: course_ids } },
      });

      return { message: 'Courses permanently deleted successfully', count: result.count };
    } catch (error) {
      this.logger.error('Error bulk hard deleting courses', error);
      throw new InternalServerErrorException('Failed to bulk hard delete courses');
    }
  }

  async updateCourseFullWithFiles(courseId: string, dto: any, files: Express.Multer.File[]): Promise<any> {
    const uploadedFiles: UploadedFile[] = [];
    let transactionCompleted = false;

    try {
      const existingCourse = await this.prisma.course.findUnique({
        where: { course_id: courseId },
        include: {
          sections: {
            include: {
              lessons: {
                include: { documents: true }, // 🆕 Include documents
              },
            },
          },
        },
      });

      if (!existingCourse) {
        throw new NotFoundException('Course not found');
      }

      // 🚀 Upload tất cả files song song
      this.logger.log(`🚀 Starting PARALLEL file upload...`);
      const uploadResults = await this.uploadFilesParallel(dto, files, existingCourse, uploadedFiles);

      // Database transaction
      this.logger.log(`💾 Starting database transaction...`);
      const result = await this.prisma.$transaction(
        async (tx) => {
          let thumbnailUrl = existingCourse.thumbnail;
          if (uploadResults.thumbnailUrl) {
            if (existingCourse.thumbnail) {
              await this.deleteFileFromMinIO(existingCourse.thumbnail);
            }
            thumbnailUrl = uploadResults.thumbnailUrl;
          } else if (dto.thumbnail && dto.thumbnail.includes('data:')) {
            this.logger.log(`🖼️ Processing base64 thumbnail update`);

            if (existingCourse.thumbnail) {
              await this.deleteFileFromMinIO(existingCourse.thumbnail);
            }
          } else if (dto.thumbnail && dto.thumbnail.startsWith(this.bucket)) {
            thumbnailUrl = dto.thumbnail;
          } else if (dto.thumbnail === '' || dto.thumbnail === null) {
            if (existingCourse.thumbnail) {
              await this.deleteFileFromMinIO(existingCourse.thumbnail);
            }
            thumbnailUrl = '';
          }

          const updatedCourse = await tx.course.update({
            where: { course_id: courseId },
            data: {
              course_name: dto.course_name,
              course_description: dto.course_description,
              target: dto.course_target,
              course_price: Number(dto.course_price),
              course_original_price: Number(dto.course_original_price),
              state: dto.state,
              thumbnail: thumbnailUrl,
              del_flg: dto.del_flg === 'true',
              access_type: Number(dto.access_type) || 1,
              access_duration_months: dto.access_type === '1' ? Number(dto.access_duration_months) : null,
              access_expire_at: Number(dto.access_type) === 3 ? new Date(dto.access_expire_at) : null,
              updated_at: new Date(),
            },
          });

          if (dto.sections) {
            const sections = JSON.parse(dto.sections);
            await this.processSectionsForCourse(tx, courseId, sections, existingCourse.sections, uploadResults);
          }

          transactionCompleted = true;
          return updatedCourse;
        },
        {
          maxWait: 60000,
          timeout: 120000,
        },
      );

      this.logger.log(`🎉 Course update completed!`);
      return result;
    } catch (error: any) {
      this.logger.error(`❌ Update failed: ${error.message}`);

      if (!transactionCompleted && uploadedFiles.length > 0) {
        await this.rollbackUploadedFiles(uploadedFiles);
      }

      throw error;
    }
  }

  private async processSectionsForCourse(tx: any, courseId: string, incomingSections: any[], existingSections: any[], uploadResults: any) {
    const existingSectionIds = existingSections.map((s) => s.section_id);
    const incomingSectionIds = incomingSections.filter((s) => s.section_id && !s.section_id.startsWith('temp-')).map((s) => s.section_id);

    const sectionsToDelete = existingSectionIds.filter((id) => !incomingSectionIds.includes(id));

    // 🆕 XÓA SECTIONS
    if (sectionsToDelete.length > 0) {
      const sectionsWithLessons = await tx.section.findMany({
        where: { section_id: { in: sectionsToDelete } },
        include: {
          lessons: {
            include: { documents: true },
          },
        },
      });

      for (const section of sectionsWithLessons) {
        for (const lesson of section.lessons) {
          // Xóa video
          if (lesson.lesson_video) {
            await this.deleteFileFromMinIO(lesson.lesson_video);
          }
          // 🆕 Xóa documents
          for (const doc of lesson.documents) {
            if (doc.document_url) {
              await this.deleteFileFromMinIO(doc.document_url);
            }
          }
        }
      }

      // Cascade delete sẽ xóa lessons và documents
      await tx.section.deleteMany({
        where: { section_id: { in: sectionsToDelete } },
      });
    }

    for (let sectionIndex = 0; sectionIndex < incomingSections.length; sectionIndex++) {
      const sectionData = incomingSections[sectionIndex];

      if (sectionData.section_id && !sectionData.section_id.startsWith('temp-')) {
        await tx.section.update({
          where: { section_id: sectionData.section_id },
          data: {
            section_title: sectionData.section_title,
            updated_at: new Date(),
          },
        });

        const existingSection = existingSections.find((s) => s.section_id === sectionData.section_id);
        await this.processLessonsForSection(tx, sectionData.section_id, sectionData.lessons || [], sectionIndex, existingSection?.lessons || [], uploadResults);
      } else {
        const newSection = await tx.section.create({
          data: {
            section_title: sectionData.section_title,
            course_id: courseId,
            del_flg: false,
          },
        });

        if (sectionData.lessons && sectionData.lessons.length > 0) {
          await this.processLessonsForSection(tx, newSection.section_id, sectionData.lessons, sectionIndex, [], uploadResults);
        }
      }
    }
  }

  private async processLessonsForSection(tx: any, sectionId: string, incomingLessons: any[], sectionIndex: number, existingLessons: any[], uploadResults: any) {
    const existingLessonIds = existingLessons.map((l) => l.lesson_id);
    const incomingLessonIds = incomingLessons.filter((l) => l.lesson_id && !l.lesson_id.startsWith('temp-')).map((l) => l.lesson_id);

    const lessonsToDelete = existingLessonIds.filter((id) => !incomingLessonIds.includes(id));

    // Xóa lesson và file
    if (lessonsToDelete.length > 0) {
      this.logger.log(`🗑️ Deleting ${lessonsToDelete.length} lessons...`);

      const lessonsToDeleteData = await tx.lesson.findMany({
        where: { lesson_id: { in: lessonsToDelete } },
        include: { documents: true },
      });

      for (const lesson of lessonsToDeleteData) {
        if (lesson.lesson_video) {
          await this.deleteFileFromMinIO(lesson.lesson_video);
        }

        for (const doc of lesson.documents) {
          if (doc.document_url) {
            await this.deleteFileFromMinIO(doc.document_url);
          }
        }
      }

      await tx.lesson.deleteMany({
        where: { lesson_id: { in: lessonsToDelete } },
      });
    }

    // Xử lý từng lesson
    for (let lessonIndex = 0; lessonIndex < incomingLessons.length; lessonIndex++) {
      const lessonData = incomingLessons[lessonIndex];

      let lessonVideoUrl = lessonData.lesson_video;
      const videoUploadKey = `lesson_video_${sectionIndex}_${lessonIndex}`;

      if (uploadResults[videoUploadKey]) {
        lessonVideoUrl = uploadResults[videoUploadKey];
      }

      // Xử lý xóa video
      if (lessonData._deleted_video && !uploadResults[videoUploadKey]) {
        const existingLesson = existingLessons.find((l) => l.lesson_id === lessonData.lesson_id);

        if (existingLesson && existingLesson.lesson_video) {
          this.logger.log(`🗑️ Deleting video for lesson ${lessonData.lesson_id}`);
          await this.deleteFileFromMinIO(existingLesson.lesson_video);
        }

        lessonVideoUrl = '';
      }

      // Tính độ dài bài học
      let videoDuration = Number(lessonData.video_duration) || 0;
      // let quizDuration = 0;

      // // Tính thời gian từ quizzes
      // if (lessonData.quizzes && lessonData.quizzes.length > 0) {
      //   const quizIds = lessonData.quizzes.map((q: any) => q.quiz_id);
      //   const quizzesInfo = await tx.quiz.findMany({
      //     where: { quiz_id: { in: quizIds } },
      //     select: { quiz_id: true, duration_minutes: true },
      //   });

      //   // const quizDurationMap = new Map();
      //   // quizzesInfo.forEach((quiz) => {
      //   //   quizDurationMap.set(quiz.quiz_id, quiz.duration_minutes || 0);
      //   // });

      //   // for (const quiz of lessonData.quizzes) {
      //   //   quizDuration += quizDurationMap.get(quiz.quiz_id) || 0;
      //   // }
      // }

      // const totalMinutes = videoDuration + quizDuration;
          const totalMinutes = videoDuration;

      if (lessonData.lesson_id && !lessonData.lesson_id.startsWith('temp-')) {
        // Cập nhật lesson hiện tại
        await tx.lesson.update({
          where: { lesson_id: lessonData.lesson_id },
          data: {
            lesson_title: lessonData.lesson_title,
            lesson_type: Number(lessonData.lesson_type) || 0,
            lesson_video: lessonVideoUrl,
            minutes: totalMinutes, // Tổng thời gian
            video_duration: videoDuration, // Thời gian video riêng
            lesson_order: lessonIndex,
            access_type: Number(lessonData.access_type) || 3,
            updated_at: new Date(),
          },
        });

        // Xử lý Quiz - Luôn gọi hàm này (ngay cả khi quizzes = [])
        await this.processLessonQuizzes(tx, lessonData.lesson_id, lessonData.quizzes || []);

        // Xử lý documents
        await this.processDocumentsForLesson(tx, lessonData.lesson_id, lessonData.documents || [], sectionIndex, lessonIndex, uploadResults);
      } else {
        // Tạo lesson mới
        const newLesson = await tx.lesson.create({
          data: {
            section_id: sectionId,
            lesson_title: lessonData.lesson_title,
            lesson_type: Number(lessonData.lesson_type) || 0,
            lesson_video: lessonVideoUrl,
            lesson_order: lessonIndex,
            minutes: totalMinutes, // Tổng thời gian
            video_duration: videoDuration, // Thời gian video riêng
            access_type: Number(lessonData.access_type) || 3,
            del_flg: false,
          },
        });

        // Xử lý quizzes cho lesson mới
        if (lessonData.quizzes && lessonData.quizzes.length > 0) {
          await this.processLessonQuizzes(tx, newLesson.lesson_id, lessonData.quizzes);
        }

        // Xử lý documents
        if (lessonData.documents && lessonData.documents.length > 0) {
          await this.processDocumentsForLesson(tx, newLesson.lesson_id, lessonData.documents, sectionIndex, lessonIndex, uploadResults);
        }
      }
    }
  }

  private async processDocumentsForLesson(tx: any, lessonId: string, incomingDocuments: any[], sectionIndex: number, lessonIndex: number, uploadResults: any) {
    const existingDocuments = await tx.document.findMany({
      where: { lesson_id: lessonId },
    });

    const existingDocIds = existingDocuments.map((d) => d.document_id);

    const incomingDocIds = incomingDocuments.filter((d) => d.document_id && !d.document_id.startsWith('temp-') && !d._deleted).map((d) => d.document_id);

    const docsToDelete = existingDocIds.filter((id) => !incomingDocIds.includes(id));

    const deletedDocIds = incomingDocuments.filter((d) => d._deleted && d.document_id && !d.document_id.startsWith('temp-')).map((d) => d.document_id);

    const allDocsToDelete = [...new Set([...docsToDelete, ...deletedDocIds])];

    if (allDocsToDelete.length > 0) {
      this.logger.log(`🗑️ Deleting ${allDocsToDelete.length} documents from lesson ${lessonId}`);

      const docsToDeleteData = existingDocuments.filter((d) => allDocsToDelete.includes(d.document_id));
      for (const doc of docsToDeleteData) {
        if (doc.document_url) {
          try {
            await this.deleteFileFromMinIO(doc.document_url);
            this.logger.log(`✅ Deleted file: ${doc.document_name}`);
          } catch (error: any) {
            this.logger.error(`❌ Failed to delete file: ${doc.document_name}`, error.message);
          }
        }
      }

      await tx.document.deleteMany({
        where: { document_id: { in: allDocsToDelete } },
      });
    }

    for (let docIndex = 0; docIndex < incomingDocuments.length; docIndex++) {
      const docData = incomingDocuments[docIndex];

      if (docData._deleted) {
        continue;
      }

      const docKey = `lesson_doc_${sectionIndex}_${lessonIndex}_${docIndex}`;

      let fileExtension = '';

      let sourceUrl = '';
      if (uploadResults[docKey]) {
        sourceUrl = uploadResults[docKey];
      } else if (docData.document_url && typeof docData.document_url === 'string') {
        sourceUrl = docData.document_url;
      } else if (docData.document_url instanceof File) {
        sourceUrl = docData.document_url.name;
      }

      fileExtension = this.getFileExtension(sourceUrl);

      if (docData.document_id && !docData.document_id.startsWith('temp-')) {
        const existingDoc = existingDocuments.find((d) => d.document_id === docData.document_id);

        if (!existingDoc) {
          this.logger.warn(`Document ${docData.document_id} not found, skipping update`);
          continue;
        }

        if (uploadResults[docKey]) {
          if (existingDoc.document_url) {
            try {
              await this.deleteFileFromMinIO(existingDoc.document_url);
              this.logger.log(`✅ Deleted old document file: ${existingDoc.document_name}`);
            } catch (error: any) {
              this.logger.error(`❌ Failed to delete old file`, error.message);
            }
          }

          await tx.document.update({
            where: { document_id: docData.document_id },
            data: {
              document_url: uploadResults[docKey],
              document_name: docData.document_name,
              extension: fileExtension,
              size: docData.size || 0,
              isDownloadable: docData.isDownloadable ?? true,
              updated_at: new Date(),
            },
          });
          this.logger.log(`✅ Updated document with new file: ${docData.document_name}`);
        } else {
          await tx.document.update({
            where: { document_id: docData.document_id },
            data: {
              document_name: docData.document_name,
              extension: fileExtension,
              size: docData.size || 0,
              isDownloadable: docData.isDownloadable ?? true,
              updated_at: new Date(),
            },
          });
          this.logger.log(`✅ Updated document metadata: ${docData.document_name}`);
        }
      } else if (uploadResults[docKey]) {
        await tx.document.create({
          data: {
            lesson_id: lessonId,
            document_url: uploadResults[docKey],
            document_name: docData.document_name,
            size: docData.size || 0,
            isDownloadable: docData.isDownloadable ?? true,
            extension: fileExtension,
          },
        });
        this.logger.log(`✅ Created new document: ${docData.document_name}`);
      }
    }
  }

  private async processLessonQuizzes(tx: any, lessonId: string, quizzes: any[]) {
    // Xóa tất cả quiz cũ của lesson này
    await tx.lessonQuiz.deleteMany({
      where: { lesson_id: lessonId },
    });

    // 2. Tạo quiz mới (nếu có)
    if (quizzes && quizzes.length > 0) {
      await tx.lessonQuiz.createMany({
        data: quizzes.map((quiz: any, index: number) => ({
          lesson_id: lessonId,
          quiz_id: quiz.quiz_id,
          order: index,
        })),
      });
      this.logger.log(`✅ Added ${quizzes.length} quizzes to lesson ${lessonId}`);
    } else {
      this.logger.log(`✅ Removed all quizzes from lesson ${lessonId}`);
    }
  }

  async findForSelect() {
    return this.prisma.course.findMany({
      where: {
        del_flg: false,
      },
      select: {
        course_id: true,
        course_name: true,
      },
      orderBy: {
        course_name: 'asc',
      },
    });
  }
}
