import { Module } from '@nestjs/common';
import { MansSuitService } from './mans_suit.service';
import { MansSuitController } from './mans_suit.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MansSuit } from './entities/mans-suit.entity';
import { MansSuitProducts } from './entities/mans-suit-products.entity';
import { MansSuitNumber } from './entities/mans-suit-numbers.entity';
import { MansSuitPictures } from './entities/mans-suit-pictures.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([
      MansSuit,
      MansSuitProducts,
      MansSuitNumber,
      MansSuitPictures
    ]),
  ],
  providers: [MansSuitService],
  controllers: [MansSuitController]
})
export class MansSuitModule {}
