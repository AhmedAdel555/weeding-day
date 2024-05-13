import { Injectable } from '@nestjs/common';
import { WeedingHall } from './entities/weeding-hall.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WeedingHallCustomPackages } from './entities/weeding-hall-custom-packages.entity';
import { SaveCustomPackageDTO } from './dto/save-custom-package.dto';

@Injectable()
export class WeedingHallCustomPackageService {

  constructor(
    @InjectRepository(WeedingHall)
    private weddingHallRepository: Repository<WeedingHall>,
    @InjectRepository(WeedingHallCustomPackages)
    private weedingHallCustomPackagesRepository: Repository<WeedingHallCustomPackages>,
  ) {}

  async createCustomPackage(saveCustomPackageDTO: SaveCustomPackageDTO, vendorId: number){

    const weedingHall = await this.weddingHallRepository.findOneBy({user:{id: vendorId}})

    const newCustomPackage = new WeedingHallCustomPackages()
    newCustomPackage.package_description = saveCustomPackageDTO.package_description;
    newCustomPackage.price = saveCustomPackageDTO.price;
    newCustomPackage.weeding_hall = weedingHall;

    return this.weedingHallCustomPackagesRepository.save(newCustomPackage);

  }

  async updateCustomPackage(saveCustomPackageDTO: SaveCustomPackageDTO, customPackageId: number){

    const customPackage = await this.weedingHallCustomPackagesRepository.findOneBy({id: customPackageId});

    customPackage.package_description = saveCustomPackageDTO.package_description;
    customPackage.price = saveCustomPackageDTO.price;

     return this.weedingHallCustomPackagesRepository.save(customPackage);
  }

  async deleteCustomPackage(customPackageId: number){

    return this.weedingHallCustomPackagesRepository.delete(customPackageId);

  }

}