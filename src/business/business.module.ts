import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessCategory } from './entities-abstraction/budiness-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessCategory])],
  exports: [TypeOrmModule]
})
export class BusinessModule {}
