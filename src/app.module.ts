import {  Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WeedingHallModule } from './weeding_hall/weeding_hall.module';
import { AuthModule } from './auth/auth.module';
import { BusinessModule } from './business/business.module';
import { MansSuitModule } from './mans_suit/mans_suit.module';
import { WomensAtelierModule } from './womens_atelier/womens_atelier.module';
import { BarberModule } from './barber/barber.module';
import { BeautySalonModule } from './beauty-salon/beauty-salon.module';
import { dataSourseOptions } from 'db/data-source';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourseOptions),
    UsersModule,
    WeedingHallModule,
    AuthModule,
    BusinessModule,
    MansSuitModule,
    WomensAtelierModule,
    BarberModule,
    BeautySalonModule,
    OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule{}

