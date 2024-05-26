import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MansSuit } from './entities/mans-suit.entity';
import { Repository } from 'typeorm';
import { MansSuitNumber } from './entities/mans-suit-numbers.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateBusinessDTO } from 'src/business/dto/create-business.dto';
import { MansSuitProducts } from './entities/mans-suit-products.entity';
import { SaveProductDTO } from './dto/save-product.dto';
import { MansSuitPictures } from './entities/mans-suit-pictures.entity';

@Injectable()
export class MansSuitService {

    constructor(
        @InjectRepository(MansSuit)
        private MansSuitRepository: Repository<MansSuit>,
        @InjectRepository(MansSuitNumber)
        private MansSuitNumberRepository: Repository<MansSuitNumber>,
        @InjectRepository(MansSuitPictures)
        private MansSuitPicturesRepository: Repository<MansSuitPictures>,
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

        return this.MansSuitRepository.save(newMansSuit);
    }

    async findAllMansSuit(){
        return await this.MansSuitRepository.find();
    }

    async findMansSuitById(id: number){
        return await this.MansSuitRepository.findOne({where: {id: id}, relations: ['user', 'products', 'mans_suit_pictures', 'mans_suit_numbers']});
    }

    async findVendorMansSuit(vendorId: number){
        return await this.MansSuitRepository.findOne({ where: { user: {id: vendorId}}, relations: ['products', 'mans_suit_pictures', 'mans_suit_numbers']})
    }

    async uploadImage(image: Express.Multer.File, vendorId: number){
      const shop = await this.MansSuitRepository.findOneBy({ user: {id: vendorId}})
      const newPicture = new MansSuitPictures();
      newPicture.picture = image.path;
      newPicture.mans_suit = shop;
      return this.MansSuitPicturesRepository.save(newPicture);
    }
}
