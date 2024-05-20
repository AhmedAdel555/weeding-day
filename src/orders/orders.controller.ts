import { Body, Controller, Get, Param, Post, Req} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderDTO } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {

  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDTO, @Req() req) {
    return this.ordersService.createOrder(createOrderDto, req.user.id);
  }

  @Get('user/:userId')
  async getOrdersByUserId(@Param('userId') userId: number): Promise<Order[]> {
    return this.ordersService.findUserOrdersHistory(userId);
  }

  @Get('barber/:barberId')
  async getOrdersByBarberId(@Param('barberId') barberId: number): Promise<Order[]> {
    return this.ordersService.getOrdersByBarberId(barberId);
  }

  @Get('beauty-salon/:beautySalonId')
  async getOrdersByBeautySalonId(@Param('beautySalonId') beautySalonId: number): Promise<Order[]> {
    return this.ordersService.getOrdersByBeautySalonId(beautySalonId);
  }

  @Get('weeding-hall/:weedingHallId')
  async getOrdersByWeedingHallId(@Param('weedingHallId') weedingHallId: number): Promise<Order[]> {
    return this.ordersService.getOrdersByWeedingHallId(weedingHallId);
  }

  @Get('mans-suit/:mansSuitId')
  async getOrdersByMansSuitId(@Param('mansSuitId') mansSuitId: number): Promise<Order[]> {
    return this.ordersService.getOrdersByMansSuitId(mansSuitId);
  }

  @Get('womens-atelier/:womensAtelierId')
  async getOrdersByWomensAtelierId(@Param('womensAtelierId') womensAtelierId: number): Promise<Order[]> {
    return this.ordersService.getOrdersByWomensAtelierId(womensAtelierId);
  }
}
