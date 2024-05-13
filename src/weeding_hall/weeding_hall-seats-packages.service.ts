import { Injectable } from '@nestjs/common';
import { WeedingHall } from './entities/weeding-hall.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveMealORSeatPackageDTO } from './dto/save-meal-or-seat-package.dto';
import { WeedingHallSeatsPackages } from './entities/weeding-hall-seats-packages.entity';

@Injectable()
export class WeedingHallSeatsPackageService {

  constructor(
    @InjectRepository(WeedingHall)
    private weddingHallRepository: Repository<WeedingHall>,
    @InjectRepository(WeedingHallSeatsPackages)
    private weedingHallSeatsPackagesRepository: Repository<WeedingHallSeatsPackages>,
  ) {}

  async createSeatPackage(saveSeatPackageDTO: SaveMealORSeatPackageDTO, vendorId: number){

    const weedingHall = await this.weddingHallRepository.findOneBy({user:{id: vendorId}})

    const newSeatPackage = new WeedingHallSeatsPackages()
    newSeatPackage.seats_count = saveSeatPackageDTO.Count;
    newSeatPackage.price = saveSeatPackageDTO.price;
    newSeatPackage.weeding_hall = weedingHall;

    return this.weedingHallSeatsPackagesRepository.save(newSeatPackage);

  }

  async updateSeatPackage(saveSeatPackageDTO: SaveMealORSeatPackageDTO, seatPackageId: number){

    const seatPackage = await this.weedingHallSeatsPackagesRepository.findOneBy({id: seatPackageId});

    seatPackage.seats_count = saveSeatPackageDTO.Count;
    seatPackage.price = saveSeatPackageDTO.price;

     return this.weedingHallSeatsPackagesRepository.save(seatPackage);
  }

  async deleteSeatPackage(seatPackageId: number){

    return this.weedingHallSeatsPackagesRepository.delete(seatPackageId);

  }

}