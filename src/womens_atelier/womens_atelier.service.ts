import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WomensAtelier } from './entities/womens-atelier.entity';
import { Repository } from 'typeorm';
import { WomensAtelierNumber } from './entities/womens-atelier-numbers.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateBusinessDTO } from 'src/business/dto/create-business.dto';

@Injectable()
export class WomensAtelierService {

    constructor(
        @InjectRepository(WomensAtelier)
        private WomensAtelierRepository: Repository<WomensAtelier>,
        @InjectRepository(WomensAtelierNumber)
        private womensAtelierNumberRepository: Repository<WomensAtelierNumber>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async createWomensAtelier(
        womensAtelierDTO: CreateBusinessDTO,
        userId: number,
        logo: Express.Multer.File,
    ) {
        const womensAtelierNumberPromises: Promise<WomensAtelierNumber>[] = 
            womensAtelierDTO.businessNumbers.map(async (number) => {
            const businessNumber = new WomensAtelierNumber();
            businessNumber.phone = number;
            return await this.womensAtelierNumberRepository.save(businessNumber);    
        });

        const businessNumbers: WomensAtelierNumber[] = await Promise.all(
            womensAtelierNumberPromises,
        );

        const newWomensAtelier = new WomensAtelier();
        newWomensAtelier.business_name = womensAtelierDTO.businessName;
        newWomensAtelier.description = womensAtelierDTO.description;
        newWomensAtelier.facebook_url = womensAtelierDTO.facebookUrl;
        newWomensAtelier.instagram_url = womensAtelierDTO.instagramUrl;
        newWomensAtelier.zib_code = womensAtelierDTO.zibCode;
        newWomensAtelier.city = womensAtelierDTO.city;
        newWomensAtelier.street = womensAtelierDTO.street;
        newWomensAtelier.sale_price = womensAtelierDTO.salePrice;
        newWomensAtelier.rent_price = womensAtelierDTO.rentPrice;
        newWomensAtelier.logo = logo.path;

        newWomensAtelier.womens_atelier_numbers = businessNumbers;

        const vendor = await this.userRepository.findOneBy({id: userId})

        newWomensAtelier.user = vendor;

        return this.WomensAtelierRepository.save(newWomensAtelier);
    }

    async findAllWomensAteliers(){
        return await this.WomensAtelierRepository.find();
    }

    async findWomensAtelierById(id: number){
        return await this.WomensAtelierRepository.findOneBy({id: id});
    }

    async findVendorWomensAtelier(vendorId: number){
        return await this.WomensAtelierRepository.findOne({ where: { user: {id: vendorId}}})
    }
}
