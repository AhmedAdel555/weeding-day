import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { Repository } from 'typeorm';
import {CreateBusinessDTO} from './dto/create-business.dto';
import { BusinessNumber } from './entities/business-number.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private businessRepository: Repository<Business>,
    @InjectRepository(BusinessNumber)
    private businessNumbersRepository: Repository<BusinessNumber>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createBusiness(
    businessDTO: CreateBusinessDTO,
    userId: number,
    logo: Express.Multer.File,
  ): Promise<Business> {

    const businessNumbersPromises: Promise<BusinessNumber>[] =
      businessDTO.businessNumbers.map(async (number) => {
        const businessNumber = new BusinessNumber();
        businessNumber.phone = number;
        return await this.businessNumbersRepository.save(businessNumber);
      });

    const businessNumbers: BusinessNumber[] = await Promise.all(
      businessNumbersPromises,
    );

    const business = new Business();
    business.business_name = businessDTO.businessName;
    business.description = businessDTO.description;
    business.facebook_url = businessDTO.facebookUrl;
    business.instagram_url = businessDTO.instagramUrl;
    business.zib_code = businessDTO.zibCode;
    business.city = businessDTO.city;
    business.street = businessDTO.street;
    business.logo = logo.path;

    business.business_numbers = businessNumbers;

    const user = await this.userRepository.findOneBy({id: userId})

    business.user = user;

    return this.businessRepository.save(business);
  }
}
