import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { WeedingHall } from 'src/weeding_hall/entities/weeding-hall.entity';
import { Barber } from 'src/barber/entities/barber.entity';
import { BeautySalon } from 'src/beauty-salon/entities/beauty-salon.entity';
import { MansSuit } from 'src/mans_suit/entities/mans-suit.entity';
import { WomensAtelier } from 'src/womens_atelier/entities/womens-atelier.entity';
import { WeedingHallModule } from 'src/weeding_hall/weeding_hall.module';
import { BarberModule } from 'src/barber/barber.module';
import { BeautySalonModule } from 'src/beauty-salon/beauty-salon.module';
import { MansSuitModule } from 'src/mans_suit/mans_suit.module';
import { WomensAtelierModule } from 'src/womens_atelier/womens_atelier.module';

@Module({
  imports: [
    UsersModule,
    WeedingHallModule,
    BarberModule,
    BeautySalonModule,
    MansSuitModule,
    WomensAtelierModule,
    TypeOrmModule.forFeature([
      Order, 
  ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
