import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Barber } from './entities/barber.entity'; 
import { BarberNumber } from './entities/barber-numbers.entity'; 
import { User } from 'src/users/entities/user.entity';
import CreateBarberDTO from './dto/create-barber.dto'; 
import { BarberPictures } from './entities/barber-pictures.entity';

@Injectable()
export class BarberService { 

  constructor(
    @InjectRepository(Barber) 
    private barberRepository: Repository<Barber>, 
    @InjectRepository(BarberNumber)
    private barberNumberRepository: Repository<BarberNumber>, 
    @InjectRepository(BarberPictures)
    private barberPictureRepository: Repository<BarberPictures>, 
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createBarber(
    barberDTO: CreateBarberDTO, 
    userId: number,
    logo: Express.Multer.File,
  ) {

    const barberNumbersPromises: Promise<BarberNumber>[] =
        barberDTO.businessNumbers.map(async (number) => {
        const businessNumber = new BarberNumber(); 
        businessNumber.phone = number;
        return await this.barberNumberRepository.save(businessNumber);
      });

    const businessNumbers: BarberNumber[] = await Promise.all(
      barberNumbersPromises,
    );

    const newBarber = new Barber(); 
    newBarber.business_name = barberDTO.businessName;
    newBarber.description = barberDTO.description;
    newBarber.facebook_url = barberDTO.facebookUrl;
    newBarber.instagram_url = barberDTO.instagramUrl;
    newBarber.zib_code = barberDTO.zibCode;
    newBarber.city = barberDTO.city;
    newBarber.street = barberDTO.street;
    newBarber.logo = logo.path;

    newBarber.barber_numbers = businessNumbers; 

    const vendor = await this.userRepository.findOneBy({id: userId})

    newBarber.user = vendor;

    return this.barberRepository.save(newBarber); 

  }


  async uploadImage(image: Express.Multer.File, vendorId: number){
    const barber = await this.barberRepository.findOneBy({ user: {id: vendorId}})
    const newPicture = new BarberPictures();
    newPicture.picture = image.path;
    newPicture.barber = barber;
    return this.barberPictureRepository.save(newPicture);
  }

  async findAllBarbers(){
    return await this.barberRepository.find();
  }

  async findBarberById(id: number) {
    return await this.barberRepository.findOne({ where: {id: id}, relations: ['barber_numbers', 'barber_pictures', 'custom_packages', 'user']}); 
  }

  async findVendorBarber(vendorId: number) {
    return await this.barberRepository.findOne({ where: { user: {id: vendorId}}, relations: ['barber_numbers', 'barber_pictures', 'custom_packages', 'user']}) 
  }


}
