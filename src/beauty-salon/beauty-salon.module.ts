import { Module } from '@nestjs/common';
import { BeautySalonController } from './beauty-salon.controller';
import { BeautySalonService } from './beauty-salon.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeautySalon } from './entities/beauty-salon.entity';
import { BeautySalonCustomPackages } from './entities/beauty-salon-custom-packages.entity';
import { BeautySalonNumber } from './entities/beauty-salon-numbers.entity';
import { BeautySalonPictures } from './entities/beauty-salon-pictures.entity';
import { BeautySalonPackagesService } from './beauty-salon-packages.service';


@Module({ 
    imports: [
        UsersModule,
        TypeOrmModule.forFeature([
        BeautySalon,
        BeautySalonCustomPackages,
        BeautySalonNumber,
        BeautySalonPictures
    ]),

    ],
    controllers: [BeautySalonController],
    providers:[BeautySalonService, BeautySalonPackagesService],
    exports: [TypeOrmModule]
})
export class BeautySalonModule {}
