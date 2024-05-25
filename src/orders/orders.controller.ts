import { Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderDTO } from './dto/create-order.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('orders')
export class OrdersController {

  constructor(private readonly ordersService: OrdersService) {}

  @Roles([UserRole.USER])
  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDTO, @Req() req) {
    return this.ordersService.createOrder(createOrderDto, req.user.userId);
  }

  @Roles([UserRole.USER])
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  async getOrdersByUserId(@Req() req): Promise<Order[]> {
    return await this.ordersService.findUserOrdersHistory(req.user.userId);
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Get('barber/:barberId')
  async getOrdersByBarberId(@Param('barberId') barberId: number): Promise<Order[]> {
    return await this.ordersService.getOrdersByBarberId(barberId);
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Get('beauty-salon/:beautySalonId')
  async getOrdersByBeautySalonId(@Param('beautySalonId') beautySalonId: number): Promise<Order[]> {
    return await this.ordersService.getOrdersByBeautySalonId(beautySalonId);
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Get('weeding-hall/:weedingHallId')
  async getOrdersByWeedingHallId(@Param('weedingHallId') weedingHallId: number): Promise<Order[]> {
    return await this.ordersService.getOrdersByWeedingHallId(weedingHallId);
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Get('mans-suit/:mansSuitId')
  async getOrdersByMansSuitId(@Param('mansSuitId') mansSuitId: number): Promise<Order[]> {
    return await this.ordersService.getOrdersByMansSuitId(mansSuitId);
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Get('womens-atelier/:womensAtelierId')
  async getOrdersByWomensAtelierId(@Param('womensAtelierId') womensAtelierId: number): Promise<Order[]> {
    return await this.ordersService.getOrdersByWomensAtelierId(womensAtelierId);
  }
}
