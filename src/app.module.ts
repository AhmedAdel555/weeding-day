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
import { OrdersModule } from './orders/orders.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
      serveRoot: '/upload',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'springstudent',
      password: 'springstudent',
      database: 'weeding',
      logging: true,
      autoLoadEntities: true,
      synchronize: true,
    }),
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

