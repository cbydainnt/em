import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCartItemDto } from './dto/cart-item-create.input';

@Injectable()
export class CartItemService {
  private readonly prisma = new PrismaClient();

  // 🧩 Lấy toàn bộ giỏ hàng của 1 user
  async getCartByUser(user_id: string) {
    return await this.prisma.cartItem.findMany({
      where: { user_id },
      include: {
        course: true, // lấy luôn thông tin khóa học
      },
      orderBy: {
        added_at: 'desc',
      },
    });
  }

  // 🧩 Thêm 1 khóa học vào giỏ hàng
  async addToCart(dto: CreateCartItemDto) {
    // Kiểm tra trùng
    const existing = await this.prisma.cartItem.findUnique({
      where: { user_id_course_id: { user_id: dto.user_id, course_id: dto.course_id } },
    });

    if (existing) {
      throw new ConflictException('Khóa học đã có trong giỏ hàng');
    }

    return await this.prisma.cartItem.create({
      data: {
        user_id: dto.user_id,
        course_id: dto.course_id,
        added_at: new Date(),
      },
      include: {
        course: true,
      },
    });
  }

  // 🧩 Xóa 1 khóa học khỏi giỏ hàng
  async removeFromCart(user_id: string, course_id: string) {
    const existing = await this.prisma.cartItem.findUnique({
      where: { user_id_course_id: { user_id, course_id } },
    });

    if (!existing) {
      throw new NotFoundException('Không tìm thấy khóa học trong giỏ hàng');
    }

    return await this.prisma.cartItem.delete({
      where: { user_id_course_id: { user_id, course_id } },
    });
  }

  async countItemsByUser(userId: string) {
    const count = await this.prisma.cartItem.count({
      where: { user_id: userId },
    });
    return { count };
  }
  async confirmSelected(user_id: string, courseIds: string[]) {
    // Reset hết về false (an toàn)
    await this.prisma.cartItem.updateMany({
      where: { user_id },
      data: { selected: false },
    });

    // Set true cho những khóa được chọn
    await this.prisma.cartItem.updateMany({
      where: {
        user_id,
        course_id: { in: courseIds },
      },
      data: { selected: true },
    });

    return { success: true };
  }

  // cart-item.service.ts
  async removeSelected(user_id: string, courseIds: string[]) {
    if (!courseIds || courseIds.length === 0) {
      throw new NotFoundException('Không có khóa học nào được chọn');
    }

    return await this.prisma.cartItem.deleteMany({
      where: {
        user_id,
        course_id: { in: courseIds },
      },
    });
  }

  async clearCart(user_id: string) {
    return await this.prisma.cartItem.deleteMany({
      where: { user_id, selected: true },
    });
  }
}
