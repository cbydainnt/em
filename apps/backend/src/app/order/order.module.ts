import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AdminOrdersController } from './admin-orders.controller';
@Module({
  imports: [],
  providers: [OrderService],
  exports: [OrderService],
  controllers: [OrderController, AdminOrdersController],
})
export class OrderModule {}
