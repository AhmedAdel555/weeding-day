import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MansSuitProducts } from './entities/mans-suit-products.entity';
import { SaveProductDTO } from './dto/save-product.dto';
import { MansSuitService } from './mans_suit.service';

@Injectable()
export class MansSuitProductsService {

    constructor(
        @InjectRepository(MansSuitProducts)
        private MansSuitProductsRepository: Repository<MansSuitProducts>,
        private mansuitService: MansSuitService
    ) {}
    async addProduct(productDTO: SaveProductDTO, vendorId: number, picture: Express.Multer.File){

      const manSuitShop = await this.mansuitService.findVendorMansSuit(vendorId);
 
      const newProduct = new MansSuitProducts();

      newProduct.product_description = productDTO.productDescription;
      newProduct.rent_price = productDTO.rentPrice;
      newProduct.sale_price = productDTO.salePrice;
      newProduct.picture = picture.path;
      newProduct.mans_suit = manSuitShop;

      return this.MansSuitProductsRepository.save(newProduct);
   }

   async updateProduct(productDTO: SaveProductDTO, productId: number){
    const updatedProduct = await this.MansSuitProductsRepository.findOneBy({id: productId});

    updatedProduct.product_description = productDTO.productDescription;
    updatedProduct.rent_price = productDTO.rentPrice;
    updatedProduct.sale_price = productDTO.salePrice;

    return this.MansSuitProductsRepository.save(updatedProduct);
 }

  async deleteProduct(productId:number){
    return this.MansSuitProductsRepository.delete(productId);
  }
}