// report/report.service.ts
import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateReportDto, UpdateReportStatusDto, AddReportCommentDto } from './dto/create-report.dto';
import { ReportPriority, ReportStatus, UserType } from '@/enums/enum';

const prisma = new PrismaClient();

@Injectable()
export class ReportService {
  private readonly prisma = new PrismaClient();
 
  async create(data: CreateReportDto & { user_id: string }) {
    const {
      user_id,
      course_id,
      lesson_id,
      report_type,
      category,
      title,
      description,
      screenshot_urls = [],
      is_anonymous = false,
      allow_contact = true,
      priority = ReportPriority.MEDIUM, // MEDIUM
    } = data;

    if (!title?.trim()) {
      throw new BadRequestException('Tiêu đề không được để trống');
    }

    if (!description?.trim()) {
      throw new BadRequestException('Mô tả không được để trống');
    }

    // Validate course and lesson if provided
    if (course_id) {
      const course = await prisma.course.findUnique({
        where: { course_id },
      });
      if (!course) {
        throw new BadRequestException('Khóa học không tồn tại');
      }
    }

    if (lesson_id) {
      const lesson = await prisma.lesson.findUnique({
        where: { lesson_id },
      });
      if (!lesson) {
        throw new BadRequestException('Bài học không tồn tại');
      }
    }

    const newReport = await prisma.report.create({
      data: {
        user_id: is_anonymous ? null : user_id,
        course_id: course_id || null,
        lesson_id: lesson_id || null,
        report_type,
        category,
        title: title.trim(),
        description: description.trim(),
        screenshot_urls,
        is_anonymous,
        allow_contact,
        priority,
        status: ReportStatus.PENDING, // PENDING
      },
      include: {
        user: is_anonymous
          ? undefined
          : {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
        course: course_id
          ? {
              select: {
                course_id: true,
                course_name: true,
              },
            }
          : undefined,
        lesson: lesson_id
          ? {
              select: {
                lesson_id: true,
                lesson_title: true,
              },
            }
          : undefined,
      },
    });

    // Create notification for admin
    await this.createAdminNotification(newReport);

    return newReport;
  }

  async createAdminNotification(report: any) {
    try {
      // Get all admin users
      const admins = await prisma.user.findMany({
        where: {
          type: 'admin', // Assuming admin users have type = 'admin'
        },
        select: { id: true },
      });

      // Create notifications for each admin
      const notifications = admins.map((admin) => ({
        user_id: admin.id,
        user_type: UserType.ADMIN,
        title: 'Báo cáo mới',
        message: `Có báo cáo mới: ${report.title}`,
        type: 11, // REPORT
        action_url: `/admin/manage/reports`,
        context: 'report',
        created_at: new Date(),
      }));

      if (notifications.length > 0) {
        await prisma.notification.createMany({
          data: notifications,
        });
      }
    } catch (error) {
      console.error('Error creating admin notification:', error);
    }
  }

  async findAll(filters: { page?: number; limit?: number; status?: number; report_type?: number; priority?: number; user_id?: string; course_id?: string; search?: string }) {
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {
      del_flg: false,
    };

    if (filters.status) where.status = filters.status;
    if (filters.report_type) where.report_type = filters.report_type;
    if (filters.priority) where.priority = filters.priority;
    if (filters.user_id) where.user_id = filters.user_id;
    if (filters.course_id) where.course_id = filters.course_id;
    if (filters.search) {
      where.OR = [{ title: { contains: filters.search, mode: 'insensitive' } }, { description: { contains: filters.search, mode: 'insensitive' } }];
    }

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            },
          },
          course: {
            select: {
              course_id: true,
              course_name: true,
            },
          },
          lesson: {
            select: {
              lesson_id: true,
              lesson_title: true,
            },
          },
          resolver: {
            select: {
              id: true,
              name: true,
            },
          },
          comments: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  avatar: true,
                },
              },
            },
            orderBy: {
              created_at: 'asc',
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.report.count({ where }),
    ]);

    return {
      reports,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const report = await prisma.report.findFirst({
      where: {
        report_id: id,
        del_flg: false,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        course: {
          select: {
            course_id: true,
            course_name: true,
          },
        },
        lesson: {
          select: {
            lesson_id: true,
            lesson_title: true,
          },
        },
        resolver: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            created_at: 'asc',
          },
        },
      },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    return report;
  }

  async findByUser(user_id: string, course_id:string, filters: { status?: number } = {}) {
    const where: any = {
      user_id,
      course_id,
      del_flg: false,
    };

    if (filters.status) where.status = filters.status;

    return prisma.report.findMany({
      where,
      include: {
        course: {
          select: {
            course_id: true,
            course_name: true,
          },
        },
        lesson: {
          select: {
            lesson_id: true,
            lesson_title: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async updateStatus(id: string, user_id: string, dto: UpdateReportStatusDto) {
    const report = await this.findOne(id);

    // Check if user is admin or owner
    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user || (user.type !== 'admin' && report.user_id !== user_id)) {
      throw new ForbiddenException('Bạn không có quyền cập nhật trạng thái báo cáo này');
    }

    const updateData: any = {
      status: dto.status,
      updated_at: new Date(),
    };

    if (dto.status === 3) {
      // RESOLVED
      updateData.resolved_at = new Date();
      updateData.resolved_by = user_id;
      updateData.resolution_notes = dto.resolution_notes;
    } else if (dto.status === 4) {
      // REJECTED
      updateData.resolution_notes = dto.resolution_notes;
    }

    return prisma.report.update({
      where: { report_id: id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
  }

  async addComment(id: string, user_id: string, dto: AddReportCommentDto) {
    const report = await this.findOne(id);

    if (!dto.content?.trim()) {
      throw new BadRequestException('Nội dung bình luận không được để trống');
    }

    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    const isAdmin = user?.type === 'admin';

    const comment = await prisma.reportComment.create({
      data: {
        report_id: id,
        user_id: isAdmin ? user_id : null,
        content: dto.content.trim(),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    // Notify the other party
    await this.createCommentNotification(report, comment, user_id, isAdmin);

    return comment;
  }

  async createCommentNotification(report: any, comment: any, senderId: string, isAdmin: boolean) {
    try {
      let recipientId = null;
      let message = '';

      if (isAdmin) {
        // Admin commented, notify user
        recipientId = report.user_id;
        message = `Quản trị viên đã phản hồi báo cáo của bạn: "${comment.content.substring(0, 50)}..."`;
      } else {
        // User commented, notify admin
        // Get first admin
        const admin = await prisma.user.findFirst({
          where: { type: 'admin' },
          select: { id: true },
        });
        recipientId = admin?.id;
        message = `Người dùng đã bình luận trên báo cáo: "${comment.content.substring(0, 50)}..."`;
      }

      if (recipientId) {
        await prisma.notification.create({
          data: {
            user_id: recipientId,
            title: isAdmin ? 'Phản hồi từ quản trị viên' : 'Bình luận mới trên báo cáo',
            message,
            type: 1, // SYSTEM
            action_url: `/reports/${report.report_id}`,
            context: 'report_comment',
          },
        });
      }
    } catch (error) {
      console.error('Error creating comment notification:', error);
    }
  }

  async getComments(id: string) {
    return prisma.reportComment.findMany({
      where: { report_id: id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        created_at: 'asc',
      },
    });
  }

  async getStatistics(period: 'day' | 'week' | 'month' | 'year' = 'month') {
    const now = new Date();
    let startDate = new Date();

    switch (period) {
      case 'day':
        startDate.setDate(now.getDate() - 1);
        break;
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    const reports = await prisma.report.groupBy({
      by: ['report_type', 'status'],
      where: {
        created_at: {
          gte: startDate,
        },
        del_flg: false,
      },
      _count: true,
    });

    const totalByStatus = await prisma.report.groupBy({
      by: ['status'],
      where: {
        del_flg: false,
      },
      _count: true,
    });

    const recentReports = await prisma.report.findMany({
      where: {
        created_at: {
          gte: startDate,
        },
        del_flg: false,
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 10,
    });

    return {
      period,
      startDate,
      endDate: now,
      statistics: reports,
      totalByStatus,
      recentReports,
    };
  }
  async getTotalCount(): Promise<number> {
    return prisma.report.count({
      where: { del_flg: false },
    });
  }

  async getCountByStatus(status: number): Promise<number> {
    return prisma.report.count({
      where: {
        status,
        del_flg: false,
      },
    });
  }

  async getRecentReports(limit: number = 10): Promise<any[]> {
    return prisma.report.findMany({
      where: { del_flg: false },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        course: {
          select: {
            course_id: true,
            course_name: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
      take: limit,
    });
  }

  
   async updatePriority(reportId: string, priority: number): Promise<any> {
    return prisma.$transaction(async (tx) => {  // Sử dụng prisma thay vì this.prisma
      const report = await tx.report.findUnique({
        where: { report_id: reportId },
      });
      
      if (!report) {
        throw new NotFoundException('Report not found');
      }
      
      // Validate priority
      if (priority < 1 || priority > 4) {
        throw new BadRequestException('Priority must be between 1 and 4');
      }
      
      const updatedReport = await tx.report.update({
        where: { report_id: reportId },
        data: {
          priority,
          updated_at: new Date(),
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
      
      return updatedReport;
    });
  }

  async assignToAdmin(reportId: string, adminId: string, assignedBy: string): Promise<any> {
    // Create assignment record (you might need a new table for this)
    // For now, just update the report
    return prisma.report.update({
      where: { report_id: reportId },
      data: {
        resolved_by: adminId, // Reusing resolved_by field for assignment
        updated_at: new Date(),
      },
    });
  }

  async getReportsForExport(startDate?: string, endDate?: string): Promise<any[]> {
    const where: any = { del_flg: false };

    if (startDate && endDate) {
      where.created_at = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    return prisma.report.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        course: {
          select: {
            course_name: true,
          },
        },
        lesson: {
          select: {
            lesson_title: true,
          },
        },
        resolver: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async convertToCsv(reports: any[]): Promise<string> {
    const headers = ['ID', 'Tiêu đề', 'Loại', 'Trạng thái', 'Độ ưu tiên', 'Người báo cáo', 'Email', 'Khóa học', 'Bài học', 'Ngày tạo', 'Ngày giải quyết', 'Người giải quyết', 'Ghi chú giải quyết'];

    const rows = reports.map((report) => [report.report_id, `"${report.title.replace(/"/g, '""')}"`, this.getReportTypeLabel(report.report_type), this.getStatusLabel(report.status), this.getPriorityLabel(report.priority), report.user?.name || 'Ẩn danh', report.user?.email || '', report.course?.course_name || '', report.lesson?.lesson_title || '', new Date(report.created_at).toLocaleString('vi-VN'), report.resolved_at ? new Date(report.resolved_at).toLocaleString('vi-VN') : '', report.resolver?.name || '', `"${(report.resolution_notes || '').replace(/"/g, '""')}"`]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    return csvContent;
  }

  private getReportTypeLabel(type: number): string {
    const types = {
      1: 'Video',
      2: 'Bài học',
      3: 'Kỹ thuật',
      4: 'Nội dung',
      5: 'Khác',
    };
    return types[type as keyof typeof types] || 'Khác';
  }

  private getStatusLabel(status: number): string {
    const statuses = {
      1: 'Chờ xử lý',
      2: 'Đang xem xét',
      3: 'Đã giải quyết',
      4: 'Đã từ chối',
    };
    return statuses[status as keyof typeof statuses] || 'Unknown';
  }

  private getPriorityLabel(priority: number): string {
    const priorities = {
      1: 'Thấp',
      2: 'Trung bình',
      3: 'Cao',
      4: 'Khẩn cấp',
    };
    return priorities[priority as keyof typeof priorities] || 'Trung bình';
  }

  async startReview(reportId: string, adminId: string): Promise<any> {
    return prisma.$transaction(async (tx) => {
      const report = await tx.report.findUnique({
        where: { report_id: reportId },
      });
      
      if (!report) {
        throw new NotFoundException('Report not found');
      }
      
      // Chỉ chuyển từ PENDING sang IN_REVIEW
      if (report.status !== 1) {
        throw new BadRequestException('Chỉ có thể xem xét báo cáo đang chờ xử lý');
      }
      
      const updatedReport = await tx.report.update({
        where: { report_id: reportId },
        data: {
          status: 2, // IN_REVIEW
          resolved_by: adminId, // Admin đang xem xét
          updated_at: new Date(),
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
      
      
      return updatedReport;
    });
  }

  

}
