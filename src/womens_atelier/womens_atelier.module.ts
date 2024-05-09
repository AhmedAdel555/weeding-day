import { Module } from '@nestjs/common';
import { WomensAtelierService } from './womens_atelier.service';
import { WomensAtelierController } from './womens_atelier.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WomensAtelier } from './entities/womens-atelier.entity';
import { WomensAtelierCustomPackages } from './entities/womens-atelier-custom-packages';
import { WomensAtelierNumber } from './entities/womens-atelier-numbers.entity';
import { WomensAtelierPictures } from './entities/womens-atelier-pictures.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([
      WomensAtelier,
      WomensAtelierCustomPackages,
      WomensAtelierNumber,
      WomensAtelierPictures
    ]),
  ],
  providers: [WomensAtelierService],
  controllers: [WomensAtelierController]
})
export class WomensAtelierModule {}
