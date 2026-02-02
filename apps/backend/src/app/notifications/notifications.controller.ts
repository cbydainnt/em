import { Body, Controller, Post, Put, Param, Get, Query, Delete, UsePipes, ValidationPipe, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get('search')
async searchUsers(
  @Query('keyword') keyword: string,
  @Query('searchType') searchType: 'name' | 'email' | 'both' = 'name',
  @Query('limit') limit = 20
) {
  if (!keyword?.trim()) {
    throw new BadRequestException('keyword is required');
  }

  return this.notificationsService.searchUsersForAdmin(
    keyword, 
    searchType, 
    Number(limit)
  );
}

  @Get('admin/by-user')
  async getByUser(
    @Query('userId') userId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('status') status?: string,
    @Query('type') type?: any, // Cho phép string, number, hoặc array
  ) {
    if (!userId) {
      throw new BadRequestException('userId is required');
    }

    // Chuyển đổi status
    let statusNumber: number | undefined;
    if (status !== undefined && status !== '' && !isNaN(Number(status))) {
      statusNumber = Number(status);
    }

    // Chuyển đổi type
    let typeParam: number | number[] | undefined;
    if (type !== undefined && type !== '') {
      if (Array.isArray(type)) {
        typeParam = type.map((t) => Number(t)).filter((t) => !isNaN(t));
      } else if (typeof type === 'string' && type.includes(',')) {
        typeParam = type
          .split(',')
          .map((t) => Number(t.trim()))
          .filter((t) => !isNaN(t));
      } else {
        const num = Number(type);
        if (!isNaN(num)) {
          typeParam = num;
        }
      }
    }

    return this.notificationsService.findUserNotificationsForAdmin({
      userId,
      page: Number(page),
      limit: Number(limit),
      status: statusNumber,
      type: typeParam,
    });
  }

  @Get('admin/by-users')
  async getByUsers(@Query('userIds') userIds: string, @Query('page') page = 1, @Query('limit') limit = 50, @Query('status') status?: string, @Query('type') type?: any, @Query('sortBy') sortBy = 'created_at', @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'desc') {
    if (!userIds) {
      throw new BadRequestException('userIds is required');
    }

    // Parse userIds từ string sang array
    const userIdArray = userIds.split(',').filter((id) => id.trim());

    if (userIdArray.length === 0) {
      throw new BadRequestException('At least one userId is required');
    }

    // Chuyển đổi status
    let statusNumber: number | undefined;
    if (status !== undefined && status !== '' && !isNaN(Number(status))) {
      statusNumber = Number(status);
    }

    return this.notificationsService.findNotificationsByUserIds({
      userIds: userIdArray,
      page: Number(page),
      limit: Number(limit),
      status: statusNumber,
      type,
      sortBy,
      sortOrder,
    });
  }
  @Get()
  async findAll(
    @Query('userId') userId?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('status') status?: any, // Nhận any để xử lý
    @Query('type') type?: any,
    @Query('user_type') user_type?: any,
  ) {
    try {
      // Chuyển đổi status
      let statusNumber: number | undefined;
      if (status !== undefined && status !== '' && !isNaN(Number(status))) {
        statusNumber = Number(status);
      }

      // Chuyển đổi type
      let typeParam: number | number[] | undefined;
      if (type !== undefined && type !== '') {
        if (Array.isArray(type)) {
          typeParam = type.map((t) => Number(t)).filter((t) => !isNaN(t));
        } else if (typeof type === 'string' && type.includes(',')) {
          typeParam = type
            .split(',')
            .map((t) => Number(t.trim()))
            .filter((t) => !isNaN(t));
        } else {
          const num = Number(type);
          if (!isNaN(num)) {
            typeParam = num;
          }
        }
      }
      // 🔥 THÊM: Xử lý user_type parameter
      let userTypeParam: string | string[] | undefined;
      if (user_type !== undefined && user_type !== '') {
        if (Array.isArray(user_type)) {
          userTypeParam = user_type.filter((t) => t && typeof t === 'string');
        } else if (typeof user_type === 'string' && user_type.includes(',')) {
          userTypeParam = user_type
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t);
        } else {
          userTypeParam = user_type;
        }
      }

      return this.notificationsService.findAll({
        userId,
        page: Number(page),
        limit: Number(limit),
        status: statusNumber,
        type: typeParam,
        user_type: userTypeParam,
      });
    } catch (error: any) {
      console.error('Controller error:', error);
      throw new BadRequestException(`Failed to process request: ${error.message}`);
    }
  }

  @Get('unread-count')
  async getUnreadCount(
    @Query('userId') userId?: string,
    @Query('user_type') user_type?: string, // 🔥 THÊM user_type parameter
  ) {
    return this.notificationsService.getUnreadCount(userId, user_type);
  }

  @Get('unread-count-with-status')
  async getUnreadCountWithUserStatus(
    @Query('userId') userId?: string,
    @Query('user_type') user_type?: string, // 🔥 THÊM user_type parameter
  ) {
    return this.notificationsService.getUnreadCountWithUserStatus(userId, user_type);
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(id);
  }

  @Put(':id/read')
  async markAsRead(@Param('id') id: string, @Query('userId') userId?: string) {
    return this.notificationsService.markAsRead(id, userId);
  }

  @Put('read-all')
  async markAllAsRead(@Query('userId') userId?: string) {
    return this.notificationsService.markAllAsRead(userId);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string, @Query('page') page: number = 1, @Query('limit') limit: number = 50, @Query('unreadOnly') unreadOnly: boolean = false) {
    return this.notificationsService.findByUser(userId, {
      page: Number(page),
      limit: Number(limit),
      unreadOnly: unreadOnly === true,
    });
  }

  @Get('profile/:userId')
  async getNotificationsByUser(@Param('userId') userId: string, @Query('page') page: number = 1, @Query('limit') limit: number = 50, @Query('unreadOnly') unreadOnly: boolean = false) {
    return this.notificationsService.getNotificationsByUser(userId, {
      page: Number(page),
      limit: Number(limit),
      unreadOnly: unreadOnly === true,
    });
  }

  @Delete('user/:userId/clear-all')
  async clearAll(@Param('userId') userId: string) {
    return this.notificationsService.clearAll(userId);
  }

  @Get('system')
  async findSystemNotifications(@Query('page') page: number = 1, @Query('limit') limit: number = 50, @Query('status') status?: number, @Query('type') type?: number, @Query('user_type') user_type?: any) {
    return this.notificationsService.findSystemNotifications({
      page: Number(page),
      limit: Number(limit),
      status,
      type,
      user_type,
    });
  }

  @Get('system/with-status')
  async findSystemNotificationsWithUserStatus(@Query('userId') userId: string, @Query('page') page: number = 1, @Query('limit') limit: number = 50) {
    return this.notificationsService.findSystemNotificationsWithUserStatus(userId, {
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get('course/:courseId/recent-activities')
  async getCourseRecentActivities(@Param('courseId') courseId: string, @Query('limit', new ParseIntPipe({ optional: true })) limit?: number) {
    return this.notificationsService.getCourseRecentActivities(courseId, limit);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('isAdmin') isAdmin: boolean = false) {
    return this.notificationsService.remove(id, isAdmin);
  }
  @Post('consolelog')
  async logClientMessage(@Body() body: any) {
    const { title, message, userid, userType, lesson_id, course_id, context, notificationType } = body;
    console.log(`[CLIENT LOG] ${userid} (${userType}) ${title} ${message}`, notificationType, context?.userAgent ?? '');

    await this.notificationsService.logAction(title, message, userid, userType, lesson_id, course_id, notificationType, context?.userAgent ?? '');
    return { success: true };
  }
}
