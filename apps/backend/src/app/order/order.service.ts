import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateOrderDto, UpdateOrderDto } from './dto/create-order.dto';
import { OrderItemType, OrderStatus } from '@/enums/enum';
import { use } from 'passport';
const prisma = new PrismaClient({
  errorFormat: 'colorless',
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

export interface OrderFilterDto {
  page?: number;
  pageSize?: number;
  search?: string;
  searchType?: 'customer' | 'course' | 'combo';
  status?: number;
  paymentMethod?: number;
  startDate?: string;
  endDate?: string;
}

@Injectable()
export class OrderService {
  private readonly prisma = new PrismaClient();

  async createOrder(dto: CreateOrderDto, payment_method: number, status: number) {
    if (dto.items == null) return;
    const order = await this.prisma.order.create({
      data: {
        user_id: dto.user_id,
        total_price: dto.total_price,
        payment_method: payment_method,
        status: status, // pending
        created_at: new Date(),
      },
    });

    // case if buy a course or Cart
    if (!dto.combo_id) {
      const courses = await prisma.course.findMany({
        where: {
          course_id: { in: dto.items },
        },
      });

      if (courses && courses.length > 0) {
        await Promise.all(
          courses.map((course) =>
            prisma.orderItem.create({
              data: {
                order_id: order.order_id,
                item_type: OrderItemType.COURSE,
                course_id: course.course_id,
                final_price: course.course_price,
                created_at: new Date(),
              },
            }),
          ),
        );
      }
    } else {
      //buy combo
      const combo = await prisma.combo.findFirst({
        where: {
          combo_id: dto.combo_id,
          del_flg: false,
        },
      });

      await prisma.orderItem.create({
        data: {
          order_id: order.order_id,
          item_type: OrderItemType.COMBO,
          combo_id: combo.combo_id,
          final_price: combo.price,
          created_at: new Date(),
        },
      });
    }

    return {
      order,
    };
  }

  async updateStatusOrder(orderId: string, status: number) {
    const updatedOrder = await this.prisma.order.update({
      where: { order_id: orderId },
      data: { status: status },
    });
    return updatedOrder;
  }

  async findAllForAdmin(filters: OrderFilterDto) {
    const { page = 1, pageSize = 20, search, status, paymentMethod, startDate, endDate } = filters;

    const skip = (page - 1) * pageSize;

    // Build where clause
    const where: any = {};

    if (search && filters.searchType) {
      if (filters.searchType === 'customer') {
        where.OR = [{ user: { name: { contains: search, mode: 'insensitive' } } }, { user: { email: { contains: search, mode: 'insensitive' } } }];
      }

      if (filters.searchType === 'course') {
        where.order_items = {
          some: {
            del_flg: false,
            item_type: OrderItemType.COURSE,
            course: {
              course_name: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
        };
      }

      if (filters.searchType === 'combo') {
        where.order_items = {
          some: {
            del_flg: false,
            item_type: OrderItemType.COMBO,
            combo: {
              combo_name: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
        };
      }
    }

    if (status !== undefined) {
      where.status = status;
    }

    if (paymentMethod !== undefined) {
      where.payment_method = paymentMethod;
    }

    if (startDate || endDate) {
      where.created_at = {};
      if (startDate) where.created_at.gte = new Date(startDate);
      if (endDate) where.created_at.lte = new Date(endDate);
    }

    // Get orders with related data
    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: pageSize,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            },
          },
          order_items: {
            include: {
              course: {
                select: {
                  course_id: true,
                  course_name: true,
                  thumbnail: true,
                },
              },
              combo: {
                select: {
                  combo_id: true,
                  combo_name: true,
                },
              },
            },
          },
          discount_voucher: {
            select: {
              discount_voucher_id: true,
              code: true,
              discount_type: true,
              discount_value: true,
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findById(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { order_id: orderId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        order_items: {
          include: {
            course: {
              select: {
                course_id: true,
                course_name: true,
                course_description: true,
                course_price: true,
                thumbnail: true,
              },
            },
            combo: {
              select: {
                combo_id: true,
                combo_name: true,
                price: true,
                original_price: true,
              },
            },
          },
        },
        discount_voucher: true,
        discount_vouchers: {
          include: {
            voucher: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async updateOrderStatus(orderId: string, status: number) {
    const order = await this.prisma.order.findUnique({
      where: { order_id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return await this.prisma.order.update({
      where: { order_id: orderId },
      data: {
        status,
        updated_at: new Date(),
      },
    });
  }

  async getOrderStatistics() {
    const [totalOrders, pendingOrders, paidOrders, cancelledOrders, totalRevenue] = await Promise.all([
      this.prisma.order.count(),
      this.prisma.order.count({ where: { status: 1 } }),
      this.prisma.order.count({ where: { status: 2 } }),
      this.prisma.order.count({ where: { status: 3 } }),
      this.prisma.order.aggregate({
        where: { status: 2 }, // Only paid orders
        _sum: { total_price: true },
      }),
    ]);

    return {
      totalOrders,
      pendingOrders,
      paidOrders,
      cancelledOrders,
      totalRevenue: totalRevenue._sum.total_price || 0,
    };
  }

  async getOrdersByUser(user_id: string) {
    const orders = await this.prisma.order.findMany({
      where: { user_id },
      include: {
        order_items: {
          include: {
            course: {
              select: {
                course_id: true,
                course_name: true,
                course_description: true,
                course_price: true,
                thumbnail: true,
              },
            },
            combo: {
              select: {
                combo_id: true,
                combo_name: true,
                price: true,
                original_price: true,
              },
            },
          },
        },
        discount_vouchers: {
          include: { voucher: true },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    return orders;
  }

  async checkOrder(keys: string[], type: number, user_id: string) {
    const successStatus = OrderStatus.PAID;
    if (type === 1) {
      // Combo
      return this.prisma.order.findMany({
        where: {
          user_id: user_id,
          status: successStatus,
          order_items: {
            some: {
              item_type: 1,
              combo_id: { in: keys },
              del_flg: false,
            },
          },
        },
        include: {
          order_items: {
            where: { item_type: 1, combo_id: { in: keys }, del_flg: false },
            include: { combo: true },
          },
        },
      });
    }

    if (type === 2) {
      // Course
      return this.prisma.order.findMany({
        where: {
          user_id: user_id,
          status: successStatus,
          order_items: {
            some: {
              del_flg: false,
              OR: [
                {
                  item_type: 2,
                  course_id: { in: keys },
                },
                {
                  item_type: 1,
                  combo: {
                    courses: {
                      some: {
                        course_id: { in: keys },
                      },
                    },
                  },
                },
              ],
            },
          },
        },
        include: {
          order_items: {
            where: { item_type: 2, course_id: { in: keys }, del_flg: false },
            include: { course: true },
          },
        },
      });
    }

    throw new BadRequestException('Invalid type');
  }

  async getOrderReport() {
    const paidStatus = OrderStatus.PAID;

    // ===== REAL REVENUE MAP (AFTER DISCOUNT) =====
    const paidOrders = await this.prisma.order.findMany({
      where: { status: paidStatus },
      include: {
        discount_vouchers: true,
        order_items: {
          where: { del_flg: false },
          select: {
            item_type: true,
            course_id: true,
            combo_id: true,
            final_price: true, // giá gốc
          },
        },
      },
    });

    const courseRevenueMap: Record<string, number> = {};
    const comboRevenueMap: Record<string, number> = {};

    const courseVoucherMap: Record<string, number> = {};
    const comboVoucherMap: Record<string, number> = {};

    paidOrders.forEach((order) => {
      const items = order.order_items;
      if (!items.length) return;

      const hasVoucher = order.discount_vouchers?.length > 0;

      const totalOriginal = items.reduce((sum, i) => sum + (i.final_price || 0), 0);
      if (totalOriginal === 0) return;

      items.forEach((item) => {
        const ratio = item.final_price / totalOriginal;
        const realRevenue = order.total_price * ratio;

        if (item.item_type === OrderItemType.COURSE && item.course_id) {
          courseRevenueMap[item.course_id] = (courseRevenueMap[item.course_id] || 0) + realRevenue;
        }

        if (hasVoucher) {
          courseVoucherMap[item.course_id] = (courseVoucherMap[item.course_id] || 0) + 1;
        }

        if (item.item_type === OrderItemType.COMBO && item.combo_id) {
          comboRevenueMap[item.combo_id] = (comboRevenueMap[item.combo_id] || 0) + realRevenue;
        }

        if (hasVoucher) {
          comboVoucherMap[item.combo_id] = (comboVoucherMap[item.combo_id] || 0) + 1;
        }
      });
    });

    // ===== COURSE STATUS COUNT =====
    const courseStatusRaw = await this.prisma.orderItem.findMany({
      where: {
        item_type: OrderItemType.COURSE,
        del_flg: false,
      },
      select: {
        course_id: true,
        order: {
          select: {
            status: true,
          },
        },
      },
    });

    const courseStatusMap: Record<string, { paid: number; cancelled: number }> = {};

    courseStatusRaw.forEach((item) => {
      if (!item.course_id) return;

      if (!courseStatusMap[item.course_id]) {
        courseStatusMap[item.course_id] = { paid: 0, cancelled: 0 };
      }

      if (item.order.status === OrderStatus.PAID) {
        courseStatusMap[item.course_id].paid += 1;
      }

      if (item.order.status === OrderStatus.CANCELLED) {
        courseStatusMap[item.course_id].cancelled += 1;
      }
    });

    // ===== TOP COURSE =====
    const topCourses = await this.prisma.orderItem.groupBy({
      by: ['course_id'],
      where: {
        item_type: OrderItemType.COURSE,
        del_flg: false,
        order: {
          status: paidStatus,
        },
      },
      _count: {
        course_id: true,
      },
      _sum: {
        final_price: true,
      },
      orderBy: [
        {
          _count: {
            course_id: 'desc',
          },
        },
        {
          _sum: {
            final_price: 'desc',
          },
        },
        {
          course_id: 'asc',
        },
      ],
    });

    const courseIds = topCourses.map((c) => c.course_id);

    const courses = await this.prisma.course.findMany({
      where: { course_id: { in: courseIds } },
      select: {
        course_id: true,
        course_name: true,
        course_price: true,
      },
    });

    const courseReport = topCourses.map((item) => {
      const course = courses.find((c) => c.course_id === item.course_id);
      const status = courseStatusMap[item.course_id] || { paid: 0, cancelled: 0 };

      return {
        course_id: item.course_id,
        course_name: course?.course_name,
        original_course_price: course?.course_price,

        paid_count: status.paid,
        cancelled_count: status.cancelled,

        voucher_count: courseVoucherMap[item.course_id] || 0,
        revenue: Math.round(courseRevenueMap[item.course_id] || 0),
      };
    });

    // ===== COMBO STATUS COUNT =====
    const comboStatusRaw = await this.prisma.orderItem.findMany({
      where: {
        item_type: OrderItemType.COMBO,
        del_flg: false,
      },
      select: {
        combo_id: true,
        order: {
          select: {
            status: true,
          },
        },
      },
    });

    const comboStatusMap: Record<string, { paid: number; cancelled: number }> = {};

    comboStatusRaw.forEach((item) => {
      if (!item.combo_id) return;

      if (!comboStatusMap[item.combo_id]) {
        comboStatusMap[item.combo_id] = { paid: 0, cancelled: 0 };
      }

      if (item.order.status === OrderStatus.PAID) {
        comboStatusMap[item.combo_id].paid += 1;
      }

      if (item.order.status === OrderStatus.CANCELLED) {
        comboStatusMap[item.combo_id].cancelled += 1;
      }
    });

    // ===== TOP COMBO =====
    const topCombos = await this.prisma.orderItem.groupBy({
      by: ['combo_id'],
      where: {
        item_type: OrderItemType.COMBO,
        del_flg: false,
        order: {
          status: paidStatus,
        },
      },
      _count: {
        combo_id: true,
      },
      _sum: {
        final_price: true,
      },
      orderBy: [{ _count: { combo_id: 'desc' } }, { _sum: { final_price: 'desc' } }, { combo_id: 'asc' }],
    });

    const comboIds = topCombos.map((c) => c.combo_id);

    const combos = await this.prisma.combo.findMany({
      where: { combo_id: { in: comboIds } },
      select: {
        combo_id: true,
        combo_name: true,
        price: true,
      },
    });

    const comboReport = topCombos.map((item, index) => {
      const combo = combos.find((c) => c.combo_id === item.combo_id);
      const status = comboStatusMap[item.combo_id] || { paid: 0, cancelled: 0 };

      return {
        combo_id: item.combo_id,
        combo_name: combo?.combo_name,
        original_combo_price: combo?.price,

        paid_count: status.paid,
        cancelled_count: status.cancelled,

        voucher_count: comboVoucherMap[item.combo_id] || 0,
        revenue: Math.round(comboRevenueMap[item.combo_id] || 0),
      };
    });

    // ================= USER REPORT =================
    const paidOrdersForUser = await this.prisma.order.findMany({
      where: {
        status: paidStatus,
      },
      select: {
        order_id: true,
        user_id: true,
        total_price: true,
        order_items: {
          where: { del_flg: false },
          select: {
            item_type: true,
          },
        },
      },
    });

    // Lấy danh sách user_id hợp lệ
    const userIds = Array.from(new Set(paidOrdersForUser.map((o) => o.user_id).filter((id): id is string => Boolean(id))));

    // Lấy thông tin user (chỉ user tồn tại)
    const users = await this.prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
    });

    // Map user theo id
    const userMapById = Object.fromEntries(users.map((u) => [u.id, u]));

    // Build report
    const userMap: Record<
      string,
      {
        user_id: string;
        name: string;
        email: string;
        phone: string | null;
        total_courses: number;
        total_combos: number;
        revenue: number;
      }
    > = {};

    paidOrdersForUser.forEach((order) => {
      const user = userMapById[order.user_id];
      if (!user) return;

      if (!userMap[user.id]) {
        userMap[user.id] = {
          user_id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone ?? null,
          total_courses: 0,
          total_combos: 0,
          revenue: 0,
        };
      }

      order.order_items.forEach((item) => {
        if (item.item_type === OrderItemType.COURSE) {
          userMap[user.id].total_courses += 1;
        }

        if (item.item_type === OrderItemType.COMBO) {
          userMap[user.id].total_combos += 1;
        }
      });

      userMap[user.id].revenue += order.total_price || 0;
    });

    // Sort theo số lượng mua (course + combo)
    const userReport = Object.values(userMap).sort((a, b) => {
      const totalA = a.total_courses + a.total_combos;
      const totalB = b.total_courses + b.total_combos;
      return totalB - totalA;
    });

    return {
      courses: courseReport,
      combos: comboReport,
      users: userReport,
    };
  }
}
