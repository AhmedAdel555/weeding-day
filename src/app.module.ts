import { MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BusinessModule } from './business/business.module';
import { WeedingHallModule } from './weeding_hall/weeding_hall.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DBHOST,
      port: parseInt(process.env.DBPORT),
      username: process.env.DBUSERNAME,
      password: process.env.DBPASSWORD,
      database: process.env.DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    BusinessModule,
    WeedingHallModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule{}

