import {  Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WeedingHallModule } from './weeding_hall/weeding_hall.module';
import { AuthModule } from './auth/auth.module';
import { BusinessModule } from './business/business.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'springstudent',
      password: 'springstudent',
      database: 'weeding',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    WeedingHallModule,
    AuthModule,
    BusinessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule{}

