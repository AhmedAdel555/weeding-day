import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BeautySalonCustomPackages } from './entities/beauty-salon-custom-packages.entity';
import { saveProductBeautySalonDTO } from './dto/save-product-beautysalon.dto';
import { BeautySalonService } from './beauty-salon.service';

@Injectable()
export class BeautySalonPackagesService {

  constructor(
    @InjectRepository(BeautySalonCustomPackages)
    private BeautySalonProductsRepository: Repository<BeautySalonCustomPackages>,
    private beautySalonService: BeautySalonService
  ) {}

  async addPackageBeautySalon(prodctBeautySalonDTO: saveProductBeautySalonDTO, vendorId: number){
    
    const beautySalonShop = await this.beautySalonService.findVendorBeautySalon(vendorId);

    const newProduct = new BeautySalonCustomPackages();

    newProduct.package_description = prodctBeautySalonDTO.productBeautySalonDescription;
    newProduct.beauty_salon = beautySalonShop;

    return this.BeautySalonProductsRepository.save(newProduct);
  }

  async updatePackageBeautySalon(prodctBeautySalonDTO: saveProductBeautySalonDTO, productId: number){
    const updatedProduct = await this.BeautySalonProductsRepository.findOneBy({id: productId});

    updatedProduct.package_description = prodctBeautySalonDTO.productBeautySalonDescription;

    return this.BeautySalonProductsRepository.save(updatedProduct);
  }

  async getBeautySalonPackages (beautySalonId :number){
    return this.BeautySalonProductsRepository.find({
      where: {beauty_salon: {id: beautySalonId}},
    })
  }

}