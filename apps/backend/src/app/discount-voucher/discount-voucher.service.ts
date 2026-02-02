import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaClient, DiscountVoucher, Prisma } from '@prisma/client';
import { CreateDiscountVoucherInput } from './dto/create-discount-voucher.input';
import { UpdateDiscountVoucherInput } from './dto/update-discount-voucher.input';
import { FilterDiscountVoucherInput } from './dto/filter-discount-voucher.input';
import { VoucherApplicableType, VoucherStatus } from '@/enums/enum';
const prisma = new PrismaClient();

@Injectable()
export class DiscountVoucherService {
  async getApplicableUsers(voucherId: string) {
    try {
      const users = await prisma.discountVoucherUser.findMany({
        where: { discount_voucher_id: voucherId },
        select: {
          user_id: true,
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              avatar: true,
            },
          },
        },
      });

      return users.map((u) => ({
        user_id: u.user_id,
        email: u.user?.email,
        name: u.user?.name,
        avatar: u.user?.avatar,
      }));
    } catch (error) {
      this.logger.error('Error getting applicable users:', error);
      return [];
    }
  }
  private readonly logger = new Logger(DiscountVoucherService.name);

  async create(payload: CreateDiscountVoucherInput): Promise<DiscountVoucher> {
    const session = await prisma.$transaction(async (tx) => {
      const existing = await tx.discountVoucher.findUnique({
        where: { code: payload.code },
      });
      if (existing) throw new Error('Mã giảm giá đã tồn tại');

      const voucher = await tx.discountVoucher.create({
        data: {
          code: payload.code.toUpperCase(),
          discount_type: payload.discount_type,
          discount_value: payload.discount_value,
          min_order_amount: payload.min_order_amount,
          applicable_type: payload.applicable_type,
          user_scope: payload.user_scope ?? 1,
          start_date: payload.start_date,
          end_date: payload.end_date,
          usage_limit: payload.usage_limit,
          per_user_limit: 1,
          status: payload.status,
          used_count: 0,
        },
      });

      // Xử lý applicable items (nếu có)
      await this.upsertApplicableItems(tx, voucher.discount_voucher_id, payload);
      await this.upsertApplicableUsers(tx, voucher.discount_voucher_id, payload);

      return voucher;
    });

    return session;
  }

  async update(payload: UpdateDiscountVoucherInput): Promise<DiscountVoucher> {
    const session = await prisma.$transaction(async (tx) => {
      const voucher = await tx.discountVoucher.findUnique({
        where: { discount_voucher_id: payload.id },
      });
      if (!voucher) throw new Error('Không tìm thấy voucher');

      if (payload.code && payload.code !== voucher.code) {
        const existing = await tx.discountVoucher.findUnique({
          where: { code: payload.code },
        });
        if (existing) throw new Error('Mã giảm giá đã tồn tại');
      }

      const updated = await tx.discountVoucher.update({
        where: { discount_voucher_id: payload.id },
        data: {
          code: payload.code?.toUpperCase(),
          discount_type: payload.discount_type ?? voucher.discount_type,
          discount_value: payload.discount_value ?? voucher.discount_value,
          min_order_amount: payload.min_order_amount ?? voucher.min_order_amount,
          applicable_type: payload.applicable_type ?? voucher.applicable_type,
          user_scope: payload.user_scope ?? voucher.user_scope,
          start_date: payload.start_date ?? voucher.start_date,
          end_date: payload.end_date ?? voucher.end_date,
          usage_limit: payload.usage_limit ?? voucher.usage_limit,
          per_user_limit: 1,
          status: payload.status ?? voucher.status,
          updated_at: new Date(),
        },
      });

      // Cập nhật applicable items
      await this.upsertApplicableItems(tx, payload.id, payload);
      await this.upsertApplicableUsers(tx, voucher.discount_voucher_id, payload);

      return updated;
    });

    return session;
  }

  private async upsertApplicableUsers(tx: Prisma.TransactionClient, voucherId: string, payload: any) {
    // Nếu ALL USER → xoá hết mapping
    if (payload.user_scope !== 2) {
      await tx.discountVoucherUser.deleteMany({
        where: { discount_voucher_id: voucherId },
      });
      return;
    }

    if (!payload.applicable_user_ids?.length) {
      throw new BadRequestException('Phải chọn ít nhất 1 user');
    }

    // Xoá cũ
    await tx.discountVoucherUser.deleteMany({
      where: { discount_voucher_id: voucherId },
    });

    // Tạo mới
    await tx.discountVoucherUser.createMany({
      data: payload.applicable_user_ids.map((userId) => ({
        discount_voucher_id: voucherId,
        user_id: userId,
      })),
    });
  }

  private async upsertApplicableItems(tx: Prisma.TransactionClient, voucherId: string, payload: any) {
    if (payload.applicable_type !== 2 && payload.applicable_type !== 3) {
      await tx.discountVoucherItem.deleteMany({
        where: { discount_voucher_id: voucherId },
      });
      return;
    }

    // Xóa hết cũ
    await tx.discountVoucherItem.deleteMany({
      where: { discount_voucher_id: voucherId },
    });

    const items: any[] = [];

    if (payload.applicable_type === 2 && payload.applicable_course_ids?.length > 0) {
      for (const course_id of payload.applicable_course_ids) {
        items.push({ discount_voucher_id: voucherId, course_id });
      }
    }

    if (payload.applicable_type === 3 && payload.applicable_combo_ids?.length > 0) {
      for (const combo_id of payload.applicable_combo_ids) {
        items.push({ discount_voucher_id: voucherId, combo_id });
      }
    }

    if (items.length > 0) {
      await tx.discountVoucherItem.createMany({ data: items });
    }
  }

  async getApplicableItems(voucherId: string) {
    try {
      return await prisma.discountVoucherItem.findMany({
        where: { discount_voucher_id: voucherId },
        include: {
          course: true,
          combo: true,
        },
      });
    } catch (error: any) {
      this.logger.error('Error getting applicable items:', error.message);
      return [];
    }
  }

  async findAll(filters: FilterDiscountVoucherInput) {
    try {
      let where: any = {};

      if (filters.search) {
        where.code = { contains: filters.search.trim(), mode: 'insensitive' };
      }

      if (filters.status) {
        where.status = Number(filters.status);
      }

      if (filters.applicable_type) {
        where.applicable_type = Number(filters.applicable_type);
      }

      if (filters.user_scope) {
        where.user_scope = Number(filters.user_scope);
      }

      const page = Number(filters.page) || 1;
      const pageSize = Number(filters.pageSize) || 20;

      // Lấy danh sách voucher với thông tin cơ bản
      const vouchers = await prisma.discountVoucher.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { updated_at: 'desc' },
        include: {
          // Đếm số lượng user được chọn cho mỗi voucher
          applicable_users: {
            select: {
              user_id: true,
            },
          },
        },
      });

      const total = await prisma.discountVoucher.count({ where });

      
      const formattedData = vouchers.map((voucher) => ({
        ...voucher,
        applicable_user_count: voucher.applicable_users.length,
        applicable_user_ids: voucher.applicable_users.map((u) => u.user_id),
      }));

      return { data: formattedData, total };
    } catch (error: any) {
      this.logger.error('Error in findAll:', error.message);
      return { data: [], total: 0 };
    }
  }

  async findOne(id: string): Promise<DiscountVoucher | null> {
    try {
      return await prisma.discountVoucher.findUnique({
        where: { discount_voucher_id: id },
      });
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async remove(ids: string[]): Promise<boolean> {
    try {
      await prisma.$transaction(async (tx) => {
        await tx.discountVoucherItem.deleteMany({
          where: {
            discount_voucher_id: { in: ids },
          },
        });

        await tx.discountVoucherUsage.deleteMany({
          where: {
            discount_voucher_id: { in: ids },
          },
        });

        await tx.discountVoucher.deleteMany({
          where: {
            discount_voucher_id: { in: ids },
          },
        });
      });

      return true;
    } catch (error: any) {
      this.logger.error('Error removing vouchers:', error.message);
      return false;
    }
  }

  async toggleStatus(id: string): Promise<DiscountVoucher | null> {
    try {
      const voucher = await prisma.discountVoucher.findUnique({
        where: { discount_voucher_id: id },
      });

      if (!voucher) return null;

      return await prisma.discountVoucher.update({
        where: { discount_voucher_id: id },
        data: {
          status: voucher.status === 1 ? 2 : 1,
          updated_at: new Date(),
        },
      });
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  // ============================================
  // LOGIC ÁP DỤNG VOUCHER KHI CHECKOUT
  // ============================================

  /**
   * Kiểm tra và áp dụng voucher cho đơn hàng
   * @param code - Mã voucher
   * @param userId - ID người dùng
   * @param orderItems - Danh sách items trong đơn hàng
   * @returns Thông tin discount hoặc throw error
   */
  async applyVoucher(code: string, userId: string, orderItems: any[], comboId?: string) {
    // 1. Tìm voucher
    const voucher = await prisma.discountVoucher.findUnique({
      where: { code: code.toUpperCase() },
      include: {
        applicable_items: true,
        applicable_users: true, // Lấy danh sách user được áp dụng
      },
    });

    if (!voucher) throw new Error('Mã giảm giá không tồn tại');
    if (voucher.status !== VoucherStatus.ACTIVE) throw new BadRequestException('Mã giảm giá không còn hiệu lực');

    // 2. Check thời gian
    const now = new Date();
    if (voucher.start_date > now) throw new BadRequestException('Mã giảm giá chưa đến thời gian áp dụng');
    if (voucher.end_date && voucher.end_date < now) throw new BadRequestException('Mã giảm giá đã hết hạn');

    // 3. Check usage limit
    if (voucher.usage_limit && voucher.used_count >= voucher.usage_limit) {
      throw new BadRequestException('Mã giảm giá đã hết lượt sử dụng');
    }

    // 4. Check user scope - SỬA LOGIC NÀY
    if (voucher.user_scope === 2) {
      // SPECIFIC_USERS
      const userAllowed = voucher.applicable_users.some((u) => u.user_id === userId);
      if (!userAllowed) {
        throw new BadRequestException('Mã giảm giá không áp dụng cho tài khoản này');
      }
    }

    // 5. Check per user limit
    const userUsage = await prisma.discountVoucherUsage.count({
      where: {
        discount_voucher_id: voucher.discount_voucher_id,
        user_id: userId,
      },
    });

    if (voucher.per_user_limit && userUsage >= voucher.per_user_limit) {
      throw new BadRequestException('Bạn đã sử dụng hết lượt áp dụng mã này');
    }

    // 6. Tính tổng giá trị đơn hàng để check min_order_amount
    let totalOrderAmount = 0;
    const itemDetails = [];

    // Lấy thông tin chi tiết của từng item
    for (const item of orderItems) {
      if (item.item_type === 1) {
        // COMBO
        const combo = await prisma.combo.findUnique({
          where: { combo_id: item.item_id },
          select: { price: true, combo_name: true },
        });
        if (combo) {
          totalOrderAmount += combo.price;
          itemDetails.push({
            type: 'COMBO',
            id: item.item_id,
            name: combo.combo_name,
            price: combo.price,
          });
        }
      } else if (item.item_type === 2) {
        // COURSE
        const course = await prisma.course.findUnique({
          where: { course_id: item.item_id },
          select: { course_price: true, course_name: true },
        });
        if (course) {
          totalOrderAmount += course.course_price;
          itemDetails.push({
            type: 'COURSE',
            id: item.item_id,
            name: course.course_name,
            price: course.course_price,
          });
        }
      }
    }

    // 7. Check min_order_amount
    if (voucher.min_order_amount && totalOrderAmount < voucher.min_order_amount) {
      throw new BadRequestException(`Đơn hàng phải có giá trị tối thiểu ${voucher.min_order_amount.toLocaleString()}đ. ` + `Giá trị hiện tại: ${totalOrderAmount.toLocaleString()}đ`);
    }

    // 8. Check applicable items
    let applicableItems = [];
    const voucherItemIds = voucher.applicable_items.map((item) => item.course_id || item.combo_id).filter(Boolean);

    switch (voucher.applicable_type) {
      case VoucherApplicableType.ALL: // ALL ORDERS
        applicableItems = orderItems;
        break;

      case VoucherApplicableType.COURSE: // SPECIFIC COURSE
        applicableItems = orderItems.filter((item) => item.item_type === 2 && voucherItemIds.includes(item.item_id));
        if (applicableItems.length === 0) {
          throw new BadRequestException('Mã giảm giá không áp dụng cho khóa học trong giỏ hàng');
        }
        break;

      case VoucherApplicableType.COMBO: // SPECIFIC COMBO
        applicableItems = orderItems.filter((item) => item.item_type === 1 && voucherItemIds.includes(item.item_id));
        if (applicableItems.length === 0) {
          throw new BadRequestException('Mã giảm giá không áp dụng cho combo trong giỏ hàng');
        }
        break;
    }

    // 9. Tính discount amount
    let discountAmount = 0;
    if (voucher.discount_type === 1) {
      // PERCENT
      // Tính % trên tổng giá trị applicable items
      const applicableTotal = applicableItems.reduce((sum, item) => {
        const itemDetail = itemDetails.find((d) => d.id === item.item_id);
        return sum + (itemDetail?.price || 0);
      }, 0);

      discountAmount = Math.round((applicableTotal * voucher.discount_value) / 100);
    } else if (voucher.discount_type === 2) {
      // FIXED AMOUNT
      discountAmount = voucher.discount_value;
    }

    // 10. Return result
    return {
      voucher: {
        id: voucher.discount_voucher_id,
        code: voucher.code,
        discount_type: voucher.discount_type,
        discount_value: voucher.discount_value,
        discount_amount: discountAmount,
        applicable_type: voucher.applicable_type,
        min_order_amount: voucher.min_order_amount,
      },
      applicableItems,
      totalOrderAmount,
      discountAmount,
      finalAmount: totalOrderAmount - discountAmount,
      itemDetails,
    };
  }

  async markVoucherUsed(voucherId: string, userId: string, orderId: string) {
    try {
      await prisma.$transaction([
        prisma.discountVoucherUsage.create({
          data: {
            discount_voucher_id: voucherId,
            user_id: userId,
            order_id: orderId,
          },
        }),
        prisma.discountVoucher.update({
          where: { discount_voucher_id: voucherId },
          data: {
            used_count: { increment: 1 },
            updated_at: new Date(),
          },
        }),
      ]);

      return { success: true, message: 'Voucher đã được sử dụng thành công' };
    } catch (error: any) {
      this.logger.error('Error marking voucher used:', error.message);
      return {
        success: false,
        error: error.message,
        message: 'Có lỗi khi cập nhật trạng thái voucher',
      };
    }
  }
}
