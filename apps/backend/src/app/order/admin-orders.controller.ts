import { Controller, Get, Put, Param, Query, Body, NotFoundException } from '@nestjs/common';
import { OrderService, OrderFilterDto } from './order.service';

@Controller('admin/orders')
export class AdminOrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders(@Query('page') page?: string, @Query('pageSize') pageSize?: string, @Query('search') search?: string, @Query('searchType') searchType?: 'customer' | 'course' | 'combo', @Query('status') status?: string, @Query('paymentMethod') paymentMethod?: string, @Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    const filters: OrderFilterDto = {
      page: page ? parseInt(page) : 1,
      pageSize: pageSize ? parseInt(pageSize) : 20,
      search: search || undefined,
      searchType,
      status: status ? parseInt(status) : undefined,
      paymentMethod: paymentMethod ? parseInt(paymentMethod) : undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    };

    return await this.orderService.findAllForAdmin(filters);
  }

  @Get('statistics')
  async getStatistics() {
    return await this.orderService.getOrderStatistics();
  }

  @Get('report')
  async getOrderReport() {
    return this.orderService.getOrderReport();
  }

  @Get(':orderId')
  async getOrderById(@Param('orderId') orderId: string) {
    return await this.orderService.findById(orderId);
  }

  @Put(':orderId/status')
  async updateOrderStatus(@Param('orderId') orderId: string, @Body() body: { status: number }) {
    return await this.orderService.updateOrderStatus(orderId, body.status);
  }
}
