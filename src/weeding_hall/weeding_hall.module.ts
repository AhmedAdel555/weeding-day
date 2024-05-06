import { Module } from '@nestjs/common';
import { WeedingHallController } from './weeding_hall.controller';
import { WeedingHallService } from './weeding_hall.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeedingHall } from './entities/weeding-hall.entity';
import { WeedingHallMealsPackages } from './entities/weeding-hall-meals-packages.entity';
import { WeedingHallSeatsPackages } from './entities/weeding-hall-seats-packages.entity';
import { WeedingHallCustomPackages } from './entities/weeding-hall-custom-packages.entity';
import { WeedingHallNumber } from './entities/weeding-hall-numbers.entity';
import { WeedingHallPictures } from './entities/weeding-hall-pictures.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([
      WeedingHall,
      WeedingHallMealsPackages,
      WeedingHallSeatsPackages,
      WeedingHallCustomPackages,
      WeedingHallNumber,
      WeedingHallPictures
    ]),
  ],
  controllers: [WeedingHallController],
  providers: [WeedingHallService]
})


export class WeedingHallModule {}
