import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BeautySalon } from './entities/beauty-salon.entity';
import { BeautySalonNumber } from './entities/beauty-salon-numbers.entity';
import { User } from 'src/users/entities/user.entity';
import CreateBeautySalonDTO from './dto/create-beauty-salon.dto';
import { BeautySalonCustomPackages } from './entities/beauty-salon-custom-packages.entity';
import { BeautySalonPictures } from './entities/beauty-salon-pictures.entity';

@Injectable()
export class BeautySalonService {

  constructor(
    @InjectRepository(BeautySalon)
    private beautySalonRepository: Repository<BeautySalon>,
    @InjectRepository(BeautySalonNumber)
    private beautySalonNumberRepository: Repository<BeautySalonNumber>,
    @InjectRepository(BeautySalonPictures)
    private beautySalonPictureRepository: Repository<BeautySalonPictures>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createBeautySalon(
    beautySalonDTO: CreateBeautySalonDTO,
    userId: number,
    logo: Express.Multer.File,
  ) {

    const beautySalonNumbersPromises: Promise<BeautySalonNumber>[] =
        beautySalonDTO.businessNumbers.map(async (number) => {
        const businessNumber = new BeautySalonNumber();
        businessNumber.phone = number;
        return await this.beautySalonNumberRepository.save(businessNumber);
      });

    const businessNumbers: BeautySalonNumber[] = await Promise.all(
      beautySalonNumbersPromises,
    );

    const newBeautySalon = new BeautySalon();
    newBeautySalon.business_name = beautySalonDTO.businessName;
    newBeautySalon.description = beautySalonDTO.description;
    newBeautySalon.facebook_url = beautySalonDTO.facebookUrl;
    newBeautySalon.instagram_url = beautySalonDTO.instagramUrl;
    newBeautySalon.zib_code = beautySalonDTO.zibCode;
    newBeautySalon.city = beautySalonDTO.city;
    newBeautySalon.street = beautySalonDTO.street;
    newBeautySalon.logo = logo.path;

    newBeautySalon.beauty_salon_numbers = businessNumbers;

    const vendor = await this.userRepository.findOneBy({id: userId})

    newBeautySalon.user = vendor;

    return this.beautySalonRepository.save(newBeautySalon);

  }

  async findAllBeautySalons(){
    return await this.beautySalonRepository.find();
  }

  async findBeautySalonById(id: number) {
    return await this.beautySalonRepository.findOne({where: {id: id}, relations: ['beauty_salon_numbers', 'beauty_salon_pictures', 'custom_packages', 'user']});
  }

  async findVendorBeautySalon(vendorId: number) {
    return await this.beautySalonRepository.findOne({ where: { user: {id: vendorId}}, relations: ['beauty_salon_numbers', 'beauty_salon_pictures', 'custom_packages', 'user']})
  }
  
  
  async uploadImage(image: Express.Multer.File, vendorId: number){
    const salon = await this.beautySalonRepository.findOneBy({ user: {id: vendorId}})
    const newPicture = new BeautySalonPictures();
    newPicture.picture = image.path;
    newPicture.beauty_salon = salon;
    return this.beautySalonPictureRepository.save(newPicture);
  }
}
