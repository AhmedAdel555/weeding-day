import { Module } from '@nestjs/common';
import { BarberController } from './barber.controller'; 
import { BarberService } from './barber.service'; 
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barber } from './entities/barber.entity';
import { BarberCustomPackages } from './entities/barber-custom-packages.entity'; 
import { BarberNumber } from './entities/barber-numbers.entity'; 
import { BarberPictures } from './entities/barber-pictures.entity'; 

@Module({
    imports: [
        UsersModule,
        TypeOrmModule.forFeature([
            Barber, 
            BarberCustomPackages,
            BarberNumber, 
            BarberPictures, 
        ]),
    ],
    controllers: [BarberController],
    providers: [BarberService], 
})
export class BarberModule {} 
