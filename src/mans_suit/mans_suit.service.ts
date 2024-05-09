import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MansSuit } from './entities/mans-suit.entity';
import { Repository } from 'typeorm';
import { MansSuitNumber } from './entities/mans-suit-numbers.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateBusinessDTO } from 'src/business/dto/create-business.dto';

@Injectable()
export class MansSuitService {

    constructor(
        @InjectRepository(MansSuit)
        private MansSuitRepository: Repository<MansSuit>,
        @InjectRepository(MansSuitNumber)
        private MansSuitNumberRepository: Repository<MansSuitNumber>,
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
        newMansSuit.sale_price = mansSuitDTO.salePrice;
        newMansSuit.rent_price = mansSuitDTO.rentPrice;
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
}
