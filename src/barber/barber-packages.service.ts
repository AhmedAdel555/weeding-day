import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BarberNumber } from './entities/barber-numbers.entity'; 
import { saveProductBarberDTO } from './dto/save-product-barber.dto';
import { BarberCustomPackages } from './entities/barber-custom-packages.entity';
import { BarberService } from './barber.service';

@Injectable()
export class BarberPackagesService { 

  constructor(
    @InjectRepository(BarberNumber)
    private barberNumberRepository: Repository<BarberNumber>, 
    @InjectRepository(BarberCustomPackages)
    private BarberProductsRepository: Repository<BarberCustomPackages>,
    private barberService: BarberService
  ) {}

  async addProductBarber(productBarberDTO: saveProductBarberDTO, vendorId: number){

    const barberShop = await this.barberService.findVendorBarber(vendorId);

    const newProduct = new BarberCustomPackages();

    newProduct.package_description = productBarberDTO.productBarberDescription;
    newProduct.barber = barberShop;

    return this.BarberProductsRepository.save(newProduct);
  }

  async updateProductBarber(productBarberDTO: saveProductBarberDTO, productId:number){
    const updatedProduct = await this.BarberProductsRepository.findOneBy({id: productId});

    updatedProduct.package_description = productBarberDTO.productBarberDescription;

    return this.barberNumberRepository.save(updatedProduct);
  }

  async getBarberProducts (barberId: number){
    return this.BarberProductsRepository.find({
      where: {barber: {id: barberId}},
    })
  }
}