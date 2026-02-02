import { Body, Controller, Post, Put, Param, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { CheckOrderDto, CreateOrderDto, UpdateOrderDto } from './dto/create-order.dto';
import { OrderStatus, PaymentMethod } from '@/enums/enum';
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  async createOrder(@Body() dto: CreateOrderDto) {
    let payment_method: number = -1;
    const statusInput = dto.payment_method?.toLowerCase();

    switch (statusInput) {
      case 'vnpay':
        payment_method = PaymentMethod.VNPAY;
        break;
      case 'momo':
        payment_method = PaymentMethod.MOMO;
        break;
      case 'qrcode':
        payment_method = PaymentMethod.QRCODE;
        break;
      default:
        throw new Error(`Payment method is not valid: ${dto.payment_method}`);
    }

    const pendingStatus = OrderStatus.PENDING;
    return this.orderService.createOrder(dto, payment_method, pendingStatus);
  }

  @Put(':order_id')
  async updateStatusOrder(@Param('order_id') id: string, @Body() dto: UpdateOrderDto) {
    let status: number = -1;
    const statusInput = dto.status?.toLowerCase();

    switch (statusInput) {
      case 'pending':
        status = OrderStatus.PENDING;
        break;
      case 'paid':
        status = OrderStatus.PAID;
        break;
      case 'cancelled':
        status = OrderStatus.CANCELLED;
        break;
      case 'failed':
        status = OrderStatus.FAILED;
        break;
      case 'processing':
        status = OrderStatus.PROCESSING;
        break;
      default:
        throw new Error(`Status is not valid: ${dto.status}`);
    }
    return this.orderService.updateStatusOrder(id, status);
  }
  @Get('user/:user_id')
  async getOrdersByUser(@Param('user_id') user_id: string) {
    return this.orderService.getOrdersByUser(user_id);
  }

  @Post('check-order')
  async checkOrder(@Body() body: CheckOrderDto) {
    return this.orderService.checkOrder(body.keys, body.type, body.user_id);
  }
}
