import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/cart-item-create.input';
@Controller('cart_item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  // GET /cart_item/:user_id
  @Get(':user_id')
  async getCart(@Param('user_id') user_id: string) {
    return await this.cartItemService.getCartByUser(user_id);
  }

  // POST /cart_item/add
  @Post('add')
  async addToCart(@Body() createCartItemDto: CreateCartItemDto) {
    return await this.cartItemService.addToCart(createCartItemDto);
  }

  // DELETE /cart_item/remove?user_id=...&course_id=...
  @Delete('remove')
  async removeFromCart(@Query('user_id') user_id: string, @Query('course_id') course_id: string) {
    return await this.cartItemService.removeFromCart(user_id, course_id);
  }

  // DELETE /cart/clear/:user_id
  @Delete('clear/:user_id')
  async clearCart(@Param('user_id') user_id: string) {
    return await this.cartItemService.clearCart(user_id);
  }

  @Get('count/:userId')
  async countItems(@Param('userId') userId: string) {
    return this.cartItemService.countItemsByUser(userId);
  }

  @Post('confirm-selection')
  async confirmSelection(
    @Body()
    body: {
      user_id: string;
      course_ids: string[];
    },
  ) {
    return this.cartItemService.confirmSelected(body.user_id, body.course_ids);
  }

  @Post('remove-selected')
  async removeSelected(
    @Body()
    body: {
      user_id: string;
      course_ids: string[];
    },
  ) {
    return this.cartItemService.removeSelected(body.user_id, body.course_ids);
  }
}
