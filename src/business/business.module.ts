import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { BusinessNumber } from './entities/business-number.entity';
import { BusinessPicture } from './entities/business-pictures.entity';
import { UsersModule } from 'src/users/users.module';
import { BusinessCategory } from './entities/budiness-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Business, BusinessNumber, BusinessPicture, BusinessCategory]),
    UsersModule
  ],
  controllers: [],
  providers: [BusinessService],
  exports: [BusinessService]
})
export class BusinessModule {}
