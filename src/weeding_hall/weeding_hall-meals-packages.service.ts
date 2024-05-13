import { Injectable } from '@nestjs/common';
import { WeedingHall } from './entities/weeding-hall.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveMealORSeatPackageDTO } from './dto/save-meal-or-seat-package.dto';
import { WeedingHallMealsPackages } from './entities/weeding-hall-meals-packages.entity';

@Injectable()
export class WeedingHallMealsPackageService {

  constructor(
    @InjectRepository(WeedingHall)
    private weddingHallRepository: Repository<WeedingHall>,
    @InjectRepository(WeedingHallMealsPackages)
    private weedingHallMealsPackagesRepository: Repository<WeedingHallMealsPackages>,
  ) {}

  async createMealPackage(saveMealPackageDTO: SaveMealORSeatPackageDTO, vendorId: number){

    const weedingHall = await this.weddingHallRepository.findOneBy({user:{id: vendorId}})

    const newMealPackage = new WeedingHallMealsPackages()
    newMealPackage.meals_count = saveMealPackageDTO.Count;
    newMealPackage.price = saveMealPackageDTO.price;
    newMealPackage.weeding_hall = weedingHall;

    return this.weedingHallMealsPackagesRepository.save(newMealPackage);

  }

  async updateMealPackage(saveMealPackageDTO: SaveMealORSeatPackageDTO, mealPackageId: number){

    const mealPackage = await this.weedingHallMealsPackagesRepository.findOneBy({id: mealPackageId});

     mealPackage.meals_count = saveMealPackageDTO.Count;
     mealPackage.price = saveMealPackageDTO.price;

     return this.weedingHallMealsPackagesRepository.save(mealPackage);
  }

  async deleteMealPackage(mealPackageId: number){

    return this.weedingHallMealsPackagesRepository.delete(mealPackageId);

  }

}