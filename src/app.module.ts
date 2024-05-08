import {  Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WeedingHallModule } from './weeding_hall/weeding_hall.module';
import { AuthModule } from './auth/auth.module';
import { BusinessModule } from './business/business.module';
import { WomensAtelierModule } from './womens_atelier/womens_atelier.module';
import { MansSuitModule } from './mans_suit/mans_suit.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'weeding',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    WeedingHallModule,
    AuthModule,
    BusinessModule,
    WomensAtelierModule,
    MansSuitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule{}

