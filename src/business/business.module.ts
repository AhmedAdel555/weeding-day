import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessCategory } from './entities-abstraction/business-category.entity';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessCategory])],
  controllers: [BusinessController],
  providers: [BusinessService],
  exports: [TypeOrmModule]
})
export class BusinessModule {}
