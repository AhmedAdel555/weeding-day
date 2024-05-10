import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MansSuit } from './entities/mans-suit.entity';
import { Repository } from 'typeorm';
import { MansSuitNumber } from './entities/mans-suit-numbers.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateBusinessDTO } from 'src/business/dto/create-business.dto';
import { MansSuitProducts } from './entities/mans-suit-products.entity';
import { SaveProductDTO } from './dto/save-product.dto';

@Injectable()
export class MansSuitService {

    constructor(
        @InjectRepository(MansSuit)
        private MansSuitRepository: Repository<MansSuit>,
        @InjectRepository(MansSuitNumber)
        private MansSuitNumberRepository: Repository<MansSuitNumber>,
        @InjectRepository(MansSuitProducts)
        private MansSuitProductsRepository: Repository<MansSuitProducts>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async createMansSuit(
        mansSuitDTO: CreateBusinessDTO,
        userId: number,
        logo: Express.Multer.File,
    ){
        const mansSuitNumberPromises: Promise<MansSuitNumber>[] = 
            mansSuitDTO.businessNumbers.map(async (number) => {
            const businessNumber = new MansSuitNumber();   
            businessNumber.phone = number;
            return await this.MansSuitNumberRepository.save(businessNumber);
        });

        const businessNumbers: MansSuitNumber[] = await Promise.all(
            mansSuitNumberPromises,
        );

        const newMansSuit = new MansSuit();
        newMansSuit.business_name = mansSuitDTO.businessName;
        newMansSuit.description = mansSuitDTO.description;
        newMansSuit.facebook_url = mansSuitDTO.facebookUrl;
        newMansSuit.instagram_url = mansSuitDTO.instagramUrl;
        newMansSuit.zib_code  = mansSuitDTO.zibCode;
        newMansSuit.city = mansSuitDTO.city;
        newMansSuit.street = mansSuitDTO.street;
        newMansSuit.logo = logo.path;

        newMansSuit.mans_suit_numbers = businessNumbers;

        const vendor = await this.userRepository.findOneBy({id: userId})

        newMansSuit.user = vendor;

        return this.MansSuitNumberRepository.save(newMansSuit);
    }

    async findAllMansSuit(){
        return await this.MansSuitRepository.find();
    }

    async findMansSuitById(id: number){
        return await this.MansSuitRepository.findOneBy({id: id});
    }

    async findVendorMansSuit(vendorId: number){
        return await this.MansSuitRepository.findOne({ where: { user: {id: vendorId}}})
    }

    async addProduct(productDTO: SaveProductDTO, vendorId: number, picture: Express.Multer.File){

      const manSuitShop = await this.findVendorMansSuit(vendorId);
 
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

   async getMansSuitProducts(mansSuitId: number){
      return this.MansSuitProductsRepository.find({
        where: { mans_suit: { id: mansSuitId } },
      });
   }
}
