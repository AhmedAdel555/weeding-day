import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessCategory } from './entities-abstraction/business-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessCategory])],
  exports: [TypeOrmModule]
})
export class BusinessModule {}
