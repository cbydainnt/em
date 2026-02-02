import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationStatus, NotificationType } from '@/enums/enum';

@Injectable()
export class NotificationsService {
  private readonly prisma = new PrismaClient();

  async create(createNotificationDto: CreateNotificationDto) {
    try {
      if (createNotificationDto.user_id) {
        const user = await this.prisma.user.findUnique({
          where: { id: createNotificationDto.user_id },
        });
        if (!user) throw new BadRequestException('User not found');
      }

      const notification = await this.prisma.notification.create({
        data: {
          ...createNotificationDto,
          user_type: createNotificationDto.user_type || null,
          status: createNotificationDto.status || NotificationStatus.UNREAD,
          created_at: new Date(),
          updated_at: new Date(),
          del_flg: false,
        },
      });

      return { success: true, message: 'Notification created successfully', data: notification };
    } catch (error: any) {
      throw new BadRequestException(`Failed to create notification: ${error.message}`);
    }
  }
  async searchUsersForAdmin(keyword: string, searchType: 'name' | 'email' | 'both' = 'name', limit = 10) {
    if (!keyword?.trim()) {
      throw new BadRequestException('Keyword is required');
    }

    const whereCondition: any = {};

    if (searchType === 'name') {
      whereCondition.name = { contains: keyword, mode: 'insensitive' };
    } else if (searchType === 'email') {
      whereCondition.email = { contains: keyword, mode: 'insensitive' };
    } else {
      // 'both' - tìm cả tên và email
      whereCondition.OR = [{ name: { contains: keyword, mode: 'insensitive' } }, { email: { contains: keyword, mode: 'insensitive' } }];
    }

    const users = await this.prisma.user.findMany({
      where: whereCondition,
      take: limit,
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        type: true,
      },
    });

    return {
      success: true,
      data: users,
    };
  }

  async findUserNotificationsForAdmin(params) {
    const { userId, page, limit, status, type, user_type } = params;

    const skip = (page - 1) * limit;

    const where: any = {
      user_id: userId,
      del_flg: false,
    };

    if (status !== undefined) {
      where.status = Number(status);
    }

    if (type) {
      const typeArray = Array.isArray(type) ? type.map(Number) : [Number(type)];
      where.type = { in: typeArray.filter((n) => !isNaN(n)) };
    }

    if (user_type) {
      const userTypeArray = Array.isArray(user_type) ? user_type : user_type.split(',').map((t) => t.trim());
      where.user_type = { in: userTypeArray };
    }

    const [notifications, total] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
        select: {
          notification_id: true,
          title: true,
          message: true,
          type: true,
          status: true,
          created_at: true,
          user: {
            select: { id: true, name: true, email: true, avatar: true },
          },
        },
      }),
      this.prisma.notification.count({ where }),
    ]);

    return {
      success: true,
      data: notifications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findNotificationsByUserIds(params: { userIds: string[]; page: number; limit: number; status?: number; type?: number | number[] | string | string[]; sortBy?: string; sortOrder?: 'asc' | 'desc' }) {
    const { userIds, page, limit, status, type, sortBy = 'created_at', sortOrder = 'desc' } = params;

    if (!userIds || userIds.length === 0) {
      return {
        success: true,
        data: [],
        pagination: {
          page,
          limit,
          total: 0,
          pages: 0,
        },
      };
    }

    const skip = (page - 1) * limit;

    // Chuyển đổi type
    let typeArray: number[] | undefined;
    if (type !== undefined) {
      if (Array.isArray(type)) {
        typeArray = type.map((t) => Number(t)).filter((t) => !isNaN(t));
      } else if (typeof type === 'string' && type.includes(',')) {
        typeArray = type
          .split(',')
          .map((t) => Number(t.trim()))
          .filter((t) => !isNaN(t));
      } else {
        const num = Number(type);
        if (!isNaN(num)) {
          typeArray = [num];
        }
      }
    }

    // Xây dựng where condition
    const where: any = {
      user_id: { in: userIds },
      del_flg: false,
    };

    if (status !== undefined) {
      where.status = Number(status);
    }

    if (typeArray && typeArray.length > 0) {
      where.type = { in: typeArray };
    }

    // Order by
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    try {
      const [notifications, total] = await Promise.all([
        this.prisma.notification.findMany({
          where,
          skip,
          take: limit,
          orderBy,
          select: {
            notification_id: true,
            user_id: true,
            title: true,
            message: true,
            type: true,
            status: true,
            created_at: true,
            updated_at: true,
            action_url: true,
            context: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        }),
        this.prisma.notification.count({ where }),
      ]);

      return {
        success: true,
        data: notifications,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error: any) {
      console.error('Error finding notifications by user IDs:', error);
      throw new BadRequestException(`Failed to fetch notifications: ${error.message}`);
    }
  }

  async findAll(params: { userId?: string; page: number; limit: number; status?: number | string; type?: number | number[] | string | string[]; user_type?: string | string[] }) {
    try {
      const { userId, page, limit, status, type, user_type } = params; // 🔥 Lấy user_type từ params
      const skip = (page - 1) * limit;

      const statusNumber = status !== undefined ? Number(status) : undefined;

      let typeArray: number[] | undefined;
      if (type !== undefined) {
        if (Array.isArray(type)) {
          typeArray = type.map((t) => Number(t)).filter((t) => !isNaN(t));
        } else if (typeof type === 'string' && type.includes(',')) {
          typeArray = type
            .split(',')
            .map((t) => Number(t.trim()))
            .filter((t) => !isNaN(t));
        } else {
          typeArray = [Number(type)].filter((t) => !isNaN(t));
        }
      }

      // 🔥 THÊM: Xử lý user_type filter
      let userTypeArray: string[] | undefined;
      if (user_type !== undefined) {
        if (Array.isArray(user_type)) {
          userTypeArray = user_type.filter((t) => t && typeof t === 'string');
        } else if (typeof user_type === 'string' && user_type.includes(',')) {
          userTypeArray = user_type
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t);
        } else if (typeof user_type === 'string') {
          userTypeArray = [user_type];
        }
      }

      // Tạo query conditions
      const conditions: any[] = [];

      // Nếu có filter status và userId
      if (statusNumber !== undefined && userId) {
        //console.log('Filtering with status:', statusNumber);

        // Điều kiện cho thông báo cá nhân
        const personalCondition: any = {
          user_id: userId,
          status: statusNumber,
          del_flg: false,
        };

        if (typeArray && typeArray.length > 0) {
          personalCondition.type = { in: typeArray };
        }

        // 🔥 THÊM: Filter user_type cho personal notifications
        if (userTypeArray && userTypeArray.length > 0) {
          personalCondition.user_type = { in: userTypeArray };
        }

        conditions.push(personalCondition);

        // Điều kiện cho thông báo hệ thống
        if (statusNumber === NotificationStatus.UNREAD) {
          const systemUnreadCondition: any = {
            user_id: null,
            del_flg: false,
          };

          if (typeArray && typeArray.length > 0) {
            systemUnreadCondition.type = { in: typeArray };
          }

          // 🔥 THÊM: Filter user_type cho system notifications
          if (userTypeArray && userTypeArray.length > 0) {
            systemUnreadCondition.user_type = { in: userTypeArray };
          } else {
            // Nếu không có user_type filter, lấy cả notifications không có user_type (backward compatibility)
            systemUnreadCondition.user_type = { in: [null, ...(userTypeArray || [])] };
          }

          systemUnreadCondition.OR = [
            {
              userNotifications: {
                none: { user_id: userId },
              },
            },
            {
              userNotifications: {
                some: {
                  user_id: userId,
                  status: NotificationStatus.UNREAD,
                },
              },
            },
          ];

          conditions.push(systemUnreadCondition);
        } else if (statusNumber === NotificationStatus.READ) {
          const systemReadCondition: any = {
            user_id: null,
            del_flg: false,
          };

          if (typeArray && typeArray.length > 0) {
            systemReadCondition.type = { in: typeArray };
          }

          // 🔥 THÊM: Filter user_type cho system notifications
          if (userTypeArray && userTypeArray.length > 0) {
            systemReadCondition.user_type = { in: userTypeArray };
          } else {
            systemReadCondition.user_type = { in: [null, ...(userTypeArray || [])] };
          }

          systemReadCondition.userNotifications = {
            some: {
              user_id: userId,
              status: NotificationStatus.READ,
            },
          };

          conditions.push(systemReadCondition);
        }
      } else {
        // Không có filter status
        // console.log('No status filter');

        if (userId) {
          // Thông báo hệ thống
          const systemCondition: any = {
            user_id: null,
            del_flg: false,
          };
          if (typeArray && typeArray.length > 0) {
            systemCondition.type = { in: typeArray };
          }

          // 🔥 THÊM: Filter user_type cho system notifications
          if (userTypeArray && userTypeArray.length > 0) {
            systemCondition.user_type = { in: userTypeArray };
          } else {
            systemCondition.user_type = { in: [null, ...(userTypeArray || [])] };
          }

          conditions.push(systemCondition);

          // Thông báo cá nhân
          const personalCondition: any = {
            user_id: userId,
            del_flg: false,
          };
          if (typeArray && typeArray.length > 0) {
            personalCondition.type = { in: typeArray };
          }

          // 🔥 THÊM: Filter user_type cho personal notifications
          if (userTypeArray && userTypeArray.length > 0) {
            personalCondition.user_type = { in: userTypeArray };
          }

          conditions.push(personalCondition);
        } else {
          // Chỉ thông báo hệ thống (không có userId)
          const systemCondition: any = {
            user_id: null,
            del_flg: false,
          };
          if (typeArray && typeArray.length > 0) {
            systemCondition.type = { in: typeArray };
          }

          // 🔥 THÊM: Filter user_type cho system notifications
          if (userTypeArray && userTypeArray.length > 0) {
            systemCondition.user_type = { in: userTypeArray };
          } else {
            // Không có user_type filter: lấy tất cả system notifications
            // Không thêm điều kiện user_type nếu không có filter
          }

          conditions.push(systemCondition);
        }
      }

      // Where clause
      let whereClause: any = {};

      if (conditions.length > 0) {
        whereClause = { OR: conditions };
      } else {
        whereClause = { del_flg: false };
      }

      // 🔥 THÊM: Debug log để kiểm tra
      // console.log('Where clause with user_type filter:', JSON.stringify(whereClause, null, 2));
      // console.log('User type array:', userTypeArray);

      // Query với Prisma
      const [notifications, total] = await Promise.all([
        this.prisma.notification.findMany({
          where: {
            ...whereClause,
            title: { not: 'DOWNLOAD' },
          },
          skip,
          take: limit,
          orderBy: { created_at: 'desc' },
          select: {
            notification_id: true,
            user_id: true,
            user_type: true,
            title: true,
            message: true,
            type: true,
            context: true,
            action_url: true,
            status: true,
            course_id: true,
            lesson_id: true,
            created_at: true,
            updated_at: true,
            del_flg: true,
            user: {
              select: { id: true, name: true, email: true, avatar: true, type: true },
            },
            userNotifications: userId
              ? {
                  where: { user_id: userId },
                  select: { status: true, read_at: true },
                }
              : false,
          },
        }),
        this.prisma.notification.count({ where: whereClause }),
      ]);

      // 🔥 THÊM: Debug log kết quả
      // console.log('Total notifications found:', total);
      // console.log('First notification user_type:', notifications[0]?.user_type);

      // Format kết quả
      const formattedNotifications = notifications.map((notification) => {
        const result: any = { ...notification };

        if (notification.user_id === null && userId && notification.userNotifications.length > 0) {
          const userNotification = notification.userNotifications[0];
          result.status = userNotification.status;
          result.user_notification = userNotification;
        }

        return result;
      });

      return {
        success: true,
        data: formattedNotifications,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error: any) {
      console.error('Error in findAll:', error);
      throw new BadRequestException(`Failed to fetch notifications: ${error.message}`);
    }
  }
  async findOne(id: string, includeDeleted: boolean = false) {
    try {
      const where: any = { notification_id: id };
      if (!includeDeleted) {
        where.del_flg = false;
      }

      const notification = await this.prisma.notification.findUnique({
        where,
        select: {
          // 🔥 DÙNG SELECT
          notification_id: true,
          user_id: true,
          user_type: true, // 🔥 THÊM
          title: true,
          message: true,
          type: true,
          context: true,
          action_url: true,
          status: true,
          course_id: true,
          lesson_id: true,
          created_at: true,
          updated_at: true,
          del_flg: true,
          user: {
            select: { id: true, name: true, email: true, avatar: true, type: true },
          },
        },
      });

      if (!notification) throw new NotFoundException('Notification not found');
      return { success: true, data: notification };
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(`Failed to fetch notification: ${error.message}`);
    }
  }

  async markAsRead(id: string, userId?: string) {
    try {
      const notification = await this.prisma.notification.findUnique({
        where: {
          notification_id: id,
          del_flg: false,
        },
      });
      if (!notification) throw new NotFoundException('Notification not found');

      if (notification.user_id === null && userId) {
        const userNotification = await this.prisma.userNotification.upsert({
          where: { user_id_notification_id: { user_id: userId, notification_id: id } },
          create: { user_id: userId, notification_id: id, status: NotificationStatus.READ, read_at: new Date() },
          update: { status: NotificationStatus.READ, read_at: new Date() },
        });
        return { success: true, message: 'System notification marked as read', data: userNotification };
      }

      const updatedNotification = await this.prisma.notification.update({
        where: {
          notification_id: id,
          del_flg: false,
        },
        data: { status: NotificationStatus.READ, updated_at: new Date() },
      });
      return { success: true, message: 'Notification marked as read', data: updatedNotification };
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(`Failed to mark notification as read: ${error.message}`);
    }
  }

  async markAllAsRead(userId?: string) {
    try {
      if (!userId) {
        const result = await this.prisma.notification.updateMany({
          where: {
            user_id: null,
            status: NotificationStatus.UNREAD,
            del_flg: false,
          },
          data: { status: NotificationStatus.READ, updated_at: new Date() },
        });
        return { success: true, message: 'All system notifications marked as read', data: { updatedCount: result.count } };
      }

      const personalResult = await this.prisma.notification.updateMany({
        where: {
          user_id: userId,
          status: NotificationStatus.UNREAD,
          del_flg: false,
        },
        data: { status: NotificationStatus.READ, updated_at: new Date() },
      });

      const systemNotifications = await this.prisma.notification.findMany({
        where: {
          user_id: null,
          status: NotificationStatus.UNREAD,
          del_flg: false,
        },
        select: { notification_id: true },
      });

      const userNotificationPromises = systemNotifications.map((notification) =>
        this.prisma.userNotification.upsert({
          where: { user_id_notification_id: { user_id: userId, notification_id: notification.notification_id } },
          create: { user_id: userId, notification_id: notification.notification_id, status: NotificationStatus.READ, read_at: new Date() },
          update: { status: NotificationStatus.READ, read_at: new Date() },
        }),
      );

      await Promise.all(userNotificationPromises);

      return {
        success: true,
        message: 'All notifications marked as read',
        data: { updatedCount: personalResult.count + systemNotifications.length },
      };
    } catch (error: any) {
      throw new BadRequestException(`Failed to mark all notifications as read: ${error.message}`);
    }
  }

  async getUnreadCount(userId?: string, user_type?: string | string[]) {
    try {
      // Xử lý user_type parameter
      let userTypeArray: string[] | undefined;
      if (user_type !== undefined) {
        if (Array.isArray(user_type)) {
          userTypeArray = user_type.filter((t) => t && typeof t === 'string');
        } else if (typeof user_type === 'string' && user_type.includes(',')) {
          userTypeArray = user_type
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t);
        } else if (typeof user_type === 'string') {
          userTypeArray = [user_type];
        }
      }

      if (!userId) {
        // Nếu không có user, chỉ đếm thông báo hệ thống chưa đọc
        const where: any = {
          user_id: null,
          status: NotificationStatus.UNREAD,
          del_flg: false,
        };

        // 🔥 THÊM: Filter theo user_type
        if (userTypeArray && userTypeArray.length > 0) {
          where.user_type = { in: userTypeArray };
        } else {
          // Mặc định: chỉ đếm notifications cho user
          where.user_type = { in: ['user', null] };
        }

        const count = await this.prisma.notification.count({ where });
        return { success: true, data: { count } };
      }

      // Đếm thông báo cá nhân chưa đọc
      const personalWhere: any = {
        user_id: userId,
        status: NotificationStatus.UNREAD,
        del_flg: false,
      };

      // 🔥 THÊM: Filter user_type cho personal notifications
      if (userTypeArray && userTypeArray.length > 0) {
        personalWhere.user_type = { in: userTypeArray };
      }

      const personalUnreadCount = await this.prisma.notification.count({
        where: personalWhere,
      });

      // Đếm thông báo hệ thống chưa được user đánh dấu đọc
      const systemWhere: any = {
        user_id: null,
        status: NotificationStatus.UNREAD,
        del_flg: false,
      };

      // 🔥 THÊM: Filter user_type cho system notifications
      if (userTypeArray && userTypeArray.length > 0) {
        systemWhere.user_type = { in: userTypeArray };
      } else {
        // Mặc định: chỉ đếm system notifications cho user
        systemWhere.user_type = { in: ['user', null] };
      }

      // Thêm điều kiện userNotifications
      systemWhere.OR = [
        {
          userNotifications: {
            none: {
              user_id: userId,
            },
          },
        },
        {
          userNotifications: {
            some: {
              user_id: userId,
              status: NotificationStatus.UNREAD,
            },
          },
        },
      ];

      const systemUnreadCount = await this.prisma.notification.count({
        where: systemWhere,
      });

      const totalCount = personalUnreadCount + systemUnreadCount;

      return {
        success: true,
        data: { count: totalCount },
      };
    } catch (error: any) {
      throw new BadRequestException(`Failed to get unread count: ${error.message}`);
    }
  }

  async getUnreadCountWithUserStatus(userId?: string, user_type?: string | string[]) {
    try {
      // Xử lý user_type parameter
      let userTypeArray: string[] | undefined;
      if (user_type !== undefined) {
        if (Array.isArray(user_type)) {
          userTypeArray = user_type.filter((t) => t && typeof t === 'string');
        } else if (typeof user_type === 'string' && user_type.includes(',')) {
          userTypeArray = user_type
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t);
        } else if (typeof user_type === 'string') {
          userTypeArray = [user_type];
        }
      }

      if (!userId) {
        const where: any = {
          user_id: null,
          del_flg: false,
        };

        // 🔥 THÊM: Filter user_type
        if (userTypeArray && userTypeArray.length > 0) {
          where.user_type = { in: userTypeArray };
        } else {
          where.user_type = { in: ['user', null] };
        }

        const count = await this.prisma.notification.count({ where });
        return { success: true, data: { count } };
      }

      // Đếm thông báo cá nhân chưa đọc
      const personalWhere: any = {
        user_id: userId,
        status: NotificationStatus.UNREAD,
        del_flg: false,
        title: { not: 'DOWNLOAD' },
      };

      // 🔥 THÊM: Filter user_type
      if (userTypeArray && userTypeArray.length > 0) {
        personalWhere.user_type = { in: userTypeArray };
      }

      const personalUnreadCount = await this.prisma.notification.count({
        where: personalWhere,
      });

      // Đếm thông báo hệ thống chưa được user đánh dấu đọc
      const systemWhere: any = {
        user_id: null,
        del_flg: false,
      };

      // 🔥 THÊM: Filter user_type
      if (userTypeArray && userTypeArray.length > 0) {
        systemWhere.user_type = { in: userTypeArray };
      } else {
        systemWhere.user_type = { in: ['user', null] };
      }

      systemWhere.userNotifications = {
        none: {
          user_id: userId,
          status: NotificationStatus.READ,
        },
      };

      const systemUnreadCount = await this.prisma.notification.count({
        where: systemWhere,
      });

      return {
        success: true,
        data: {
          count: personalUnreadCount + systemUnreadCount,
        },
      };
    } catch (error: any) {
      throw new BadRequestException(`Failed to get unread count: ${error.message}`);
    }
  }

  async findByUser(userId: string, params: { page: number; limit: number; unreadOnly?: boolean; includeDeleted?: boolean }) {
    try {
      const { page, limit, unreadOnly, includeDeleted = false } = params;
      const skip = (page - 1) * limit;

      const where: any = { user_id: userId };
      if (!includeDeleted) {
        where.del_flg = false;
      }
      if (unreadOnly) where.status = NotificationStatus.UNREAD;

      const [notifications, total] = await Promise.all([
        this.prisma.notification.findMany({
          where,
          skip,
          take: limit,
          orderBy: { created_at: 'desc' },
          select: {
            // 🔥 DÙNG SELECT
            notification_id: true,
            user_id: true,
            user_type: true, // 🔥 THÊM
            title: true,
            message: true,
            type: true,
            context: true,
            action_url: true,
            status: true,
            course_id: true,
            lesson_id: true,
            created_at: true,
            updated_at: true,
            del_flg: true,
            course: true,
            lesson: true,
          },
        }),
        this.prisma.notification.count({ where }),
      ]);

      return {
        success: true,
        data: notifications,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      };
    } catch (error: any) {
      throw new BadRequestException(`Failed to fetch user notifications: ${error.message}`);
    }
  }

  async getNotificationsByUser(userId: string, params: { page: number; limit: number; unreadOnly?: boolean }) {
    try {
      const { page, limit, unreadOnly } = params;
      const skip = (page - 1) * limit;

      const where: any = { user_id: userId };
      if (unreadOnly) where.status = NotificationStatus.UNREAD;

      // const [notifications, total] = await Promise.all([this.prisma.notification.findMany({ where, skip, take: limit, orderBy: { created_at: 'desc' } }), this.prisma.notification.count({ where })]);
      const [notifications, total] = await Promise.all([
        this.prisma.notification.findMany({
          where,
          skip,
          take: limit,
          orderBy: { created_at: 'desc' },
          select: {
            // 🔥 DÙNG SELECT
            notification_id: true,
            user_id: true,
            user_type: true, // 🔥 THÊM
            title: true,
            message: true,
            type: true,
            context: true,
            action_url: true,
            status: true,
            course_id: true,
            lesson_id: true,
            created_at: true,
            updated_at: true,
            del_flg: true,
            course: true,
            lesson: true,
          },
        }),
        this.prisma.notification.count({ where }),
      ]);

      return {
        success: true,
        data: notifications,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      };
    } catch (error: any) {
      throw new BadRequestException(`Failed to fetch user notifications: ${error.message}`);
    }
  }

  async clearAll(userId: string) {
    try {
      const result = await this.prisma.notification.updateMany({
        where: {
          user_id: userId,
          del_flg: false,
        },
        data: {
          del_flg: true,
          updated_at: new Date(),
        },
      });

      return {
        success: true,
        message: 'All notifications soft deleted successfully',
        data: { deletedCount: result.count },
      };
    } catch (error: any) {
      throw new BadRequestException(`Failed to clear all notifications: ${error.message}`);
    }
  }

  // Hàm xóa cứng (chỉ dùng cho admin)
  async hardDelete(id: string) {
    try {
      const notification = await this.prisma.notification.findUnique({
        where: {
          notification_id: id,
          del_flg: true, // Chỉ cho phép xóa cứng những bản ghi đã xóa mềm
        },
      });

      if (!notification) {
        throw new NotFoundException('Deleted notification not found');
      }

      // Xóa các UserNotification liên quan trước
      await this.prisma.userNotification.deleteMany({
        where: { notification_id: id },
      });

      // Thực hiện xóa cứng
      await this.prisma.notification.delete({
        where: { notification_id: id },
      });

      return {
        success: true,
        message: 'Notification permanently deleted successfully',
      };
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(`Failed to permanently delete notification: ${error.message}`);
    }
  }

  // Hàm xóa cứng tất cả thông báo đã xóa mềm (chỉ dùng cho admin)
  async hardDeleteAllDeleted() {
    try {
      // Đếm số lượng trước khi xóa
      const count = await this.prisma.notification.count({
        where: { del_flg: true },
      });

      // Xóa các UserNotification liên quan trước
      const notifications = await this.prisma.notification.findMany({
        where: { del_flg: true },
        select: { notification_id: true },
      });

      const notificationIds = notifications.map((n) => n.notification_id);

      await this.prisma.userNotification.deleteMany({
        where: { notification_id: { in: notificationIds } },
      });

      // Thực hiện xóa cứng
      const result = await this.prisma.notification.deleteMany({
        where: { del_flg: true },
      });

      return {
        success: true,
        message: 'All deleted notifications permanently removed',
        data: { deletedCount: result.count, originalCount: count },
      };
    } catch (error: any) {
      throw new BadRequestException(`Failed to permanently delete all notifications: ${error.message}`);
    }
  }

  async findSystemNotifications(params: { page: number; limit: number; status?: number; type?: number; user_type?: string | string[] }) {
    return this.findAll({ ...params, userId: undefined });
  }

  async findSystemNotificationsWithUserStatus(userId: string, params: { page: number; limit: number }) {
    try {
      const { page, limit } = params;
      const skip = (page - 1) * limit;

      const [notifications, total] = await Promise.all([
        this.prisma.notification.findMany({
          where: { user_id: null },
          skip,
          take: limit,
          orderBy: { created_at: 'desc' },
          select: {
            // 🔥 DÙNG SELECT
            notification_id: true,
            user_id: true,
            user_type: true, // 🔥 THÊM
            title: true,
            message: true,
            type: true,
            context: true,
            action_url: true,
            status: true,
            course_id: true,
            lesson_id: true,
            created_at: true,
            updated_at: true,
            del_flg: true,
            userNotifications: {
              where: { user_id: userId },
              select: { status: true, read_at: true },
            },
          },
        }),
        this.prisma.notification.count({ where: { user_id: null } }),
      ]);

      const notificationsWithStatus = notifications.map((notification) => {
        const userNotification = notification.userNotifications[0];
        return {
          ...notification,
          status: userNotification ? userNotification.status : NotificationStatus.UNREAD,
          user_notification: userNotification,
        };
      });

      return {
        success: true,
        data: notificationsWithStatus,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      };
    } catch (error: any) {
      throw new BadRequestException(`Failed to fetch system notifications: ${error.message}`);
    }
  }

  async getCourseRecentActivities(courseId: string, limit: number = 20) {
    try {
      const takeLimit = Math.min(Number(limit) || 20, 50);

      const notifications = await this.prisma.notification.findMany({
        where: {
          course_id: courseId,
          type: {
            in: [NotificationType.SYSTEM],
          },
        },
        orderBy: { created_at: 'desc' },
        take: takeLimit,
        select: {
          // 🔥 DÙNG SELECT
          notification_id: true,
          user_id: true,
          user_type: true, // 🔥 THÊM
          title: true,
          message: true,
          type: true,
          context: true,
          status: true,
          course_id: true,
          lesson_id: true,
          created_at: true,
          updated_at: true,
          del_flg: true,
          user: { select: { id: true, name: true, avatar: true } },
          course: { select: { course_name: true } },
          lesson: { select: { lesson_id: true, lesson_title: true } },
        },
      });

      const activities = notifications.map((notification) => ({
        _id: notification.notification_id,
        user_id: notification.user_id,
        user_type: notification.user_type, // 🔥 THÊM
        user_name: notification.user?.name,
        user_avatar: notification.user?.avatar,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        context: notification.context,
        status: notification.status,
        created_at: notification.created_at,
        updated_at: notification.updated_at,
        course_name: notification.course?.course_name,
        lesson_id: notification.lesson?.lesson_id,
        lesson_name: notification.lesson?.lesson_title,
      }));

      return { success: true, data: activities };
    } catch (error: any) {
      console.error('❌ Error in getCourseRecentActivities:', error);
      throw new BadRequestException(`Failed to fetch course activities: ${error.message}`);
    }
  }

  // Đếm số thông báo hệ thống chưa đọc
  async getSystemUnreadCount() {
    try {
      const count = await this.prisma.notification.count({
        where: {
          user_id: null,
          status: NotificationStatus.UNREAD,
        },
      });

      return {
        success: true,
        data: { count },
      };
    } catch (error: any) {
      throw new BadRequestException(`Failed to get system unread count: ${error.message}`);
    }
  }

  // Đánh dấu tất cả thông báo hệ thống đã đọc
  async markAllSystemAsRead() {
    try {
      const result = await this.prisma.notification.updateMany({
        where: {
          user_id: null,
          status: NotificationStatus.UNREAD,
        },
        data: {
          status: NotificationStatus.READ,
          updated_at: new Date(),
        },
      });

      return {
        success: true,
        message: 'All system notifications marked as read',
        data: {
          updatedCount: result.count,
        },
      };
    } catch (error: any) {
      throw new BadRequestException(`Failed to mark all system notifications as read: ${error.message}`);
    }
  }

  // Đếm tổng số thông báo chưa đọc (cả hệ thống và cá nhân)
  async getTotalUnreadCount(userId?: string) {
    try {
      const where: any = {
        status: NotificationStatus.UNREAD,
      };

      // Nếu có userId, lấy cả thông báo hệ thống và cá nhân của user
      if (userId) {
        where.OR = [
          { user_id: null }, // Thông báo hệ thống
          { user_id: userId }, // Thông báo cá nhân
        ];
      } else {
        // Nếu không có userId, chỉ lấy thông báo hệ thống
        where.user_id = null;
      }

      const count = await this.prisma.notification.count({ where });

      return {
        success: true,
        data: { count },
      };
    } catch (error: any) {
      throw new BadRequestException(`Failed to get total unread count: ${error.message}`);
    }
  }
  // Đánh dấu tất cả thông báo đã đọc (cả hệ thống và cá nhân)
  async markAllAsReadTotal(userId?: string) {
    try {
      const where: any = {
        status: NotificationStatus.UNREAD,
      };

      // Nếu có userId, cập nhật cả thông báo hệ thống và cá nhân
      if (userId) {
        where.OR = [
          { user_id: null }, // Thông báo hệ thống
          { user_id: userId }, // Thông báo cá nhân
        ];
      } else {
        // Nếu không có userId, chỉ cập nhật thông báo hệ thống
        where.user_id = null;
      }

      const result = await this.prisma.notification.updateMany({
        where,
        data: {
          status: NotificationStatus.READ,
          updated_at: new Date(),
        },
      });

      return {
        success: true,
        message: 'All notifications marked as read',
        data: {
          updatedCount: result.count,
        },
      };
    } catch (error: any) {
      throw new BadRequestException(`Failed to mark all notifications as read: ${error.message}`);
    }
  }

  async remove(id: string, isAdmin: boolean = false) {
    try {
      const notification = await this.prisma.notification.findUnique({
        where: {
          notification_id: id,
          del_flg: false,
        },
      });

      if (!notification) {
        throw new NotFoundException('Notification not found');
      }

      // Không cho phép xóa thông báo hệ thống
      if (!isAdmin && notification.user_id === null) {
        throw new BadRequestException('Cannot delete system notifications');
      }

      // Thực hiện xóa mềm
      const softDeletedNotification = await this.prisma.notification.update({
        where: {
          notification_id: id,
          del_flg: false,
        },
        data: {
          del_flg: true,
          updated_at: new Date(),
        },
      });

      return {
        success: true,
        message: 'Notification soft deleted successfully',
        data: softDeletedNotification,
      };
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException(`Failed to delete notification: ${error.message}`);
    }
  }
  async logAction(title, message, userid, userType, lesson_id, course_id, notificationType, context) {
    try {
      return await this.prisma.notification.create({
        data: {
          title: title,
          message: message,
          user_id: userid,
          user_type: userType,
          type: notificationType,
          lesson_id: lesson_id || null,
          course_id: course_id || null,
          status: NotificationStatus.UNREAD,
          created_at: new Date(),
          updated_at: new Date(),
          context: context,
          del_flg: false,
        },
      });
    } catch (error) {
      console.log('Error logAction:', error);
    }
  }

  /**
   * ==================== HELPER METHODS ====================
   */

  private buildWhereCondition(userId?: string, status?: number, type?: number) {
    const where: any = { OR: [{ user_id: null }] }; // Luôn bao gồm thông báo hệ thống

    if (userId) where.OR.push({ user_id: userId });
    if (status !== undefined) where.status = status;
    if (type !== undefined) where.type = type;

    return where;
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}
