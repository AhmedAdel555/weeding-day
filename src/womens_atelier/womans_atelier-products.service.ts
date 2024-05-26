import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveProductAtelierDTO } from './dto/save-product-atelier.dto';
import { WomensAtelierProducts } from './entities/womens-atelier-products.entity';
import { WomensAtelierService } from './womens_atelier.service';

@Injectable()
export class WomensAtelierProductsService {

    constructor(
        @InjectRepository(WomensAtelierProducts)
        private WomansAtelierProductsRepository: Repository<WomensAtelierProducts>,
        private womanAtliersService: WomensAtelierService
    ) {}

    async addProductAtelier(productAtelierDTO: SaveProductAtelierDTO, vendorId:number, picture:Express.Multer.File){
        
      const womenAtelierShop = await this.womanAtliersService.findVendorWomensAtelier(vendorId);

      const newProduct = new WomensAtelierProducts();

      newProduct.product_description = productAtelierDTO.productDescription;
      newProduct.sale_price = productAtelierDTO.salePrice;
      newProduct.rent_price = productAtelierDTO.rentPrice;
      newProduct.picture = picture.path;
      newProduct.womens_atelier = womenAtelierShop;

      return this.WomansAtelierProductsRepository.save(newProduct);
  }

  async updateProductAtelier(productAtelierDTO: SaveProductAtelierDTO, productId:number){

      const updatedProduct = await this.WomansAtelierProductsRepository.findOneBy({id: productId});

      updatedProduct.product_description = productAtelierDTO.productDescription;
      updatedProduct.sale_price = productAtelierDTO.salePrice;
      updatedProduct.rent_price = productAtelierDTO.rentPrice;

      return this.WomansAtelierProductsRepository.save(updatedProduct);
  }

  async deleteProduct(productId:number){
    return this.WomansAtelierProductsRepository.delete(productId);
  }
}