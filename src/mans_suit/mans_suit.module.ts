import { Module } from '@nestjs/common';
import { MansSuitService } from './mans_suit.service';
import { MansSuitController } from './mans_suit.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MansSuit } from './entities/mans-suit.entity';
import { MansSuitCustomPackages } from './entities/mans-suit-custom-packages.entity';
import { MansSuitNumber } from './entities/mans-suit-numbers.entity';
import { MansSuitPictures } from './entities/mans-suit-pictures.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([
      MansSuit,
      MansSuitCustomPackages,
      MansSuitNumber,
      MansSuitPictures
    ]),
  ],
  providers: [MansSuitService],
  controllers: [MansSuitController]
})
export class MansSuitModule {}
