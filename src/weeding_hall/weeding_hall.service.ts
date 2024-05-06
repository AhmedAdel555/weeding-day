import { Injectable } from '@nestjs/common';
import { Business } from 'src/business/entities-abstraction/business';
import { WeedingHall } from './entities/weeding-hall.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import CreateWeedingHallDTO from './dto/create-weeding-hall.dto';
import { WeedingHallNumber } from './entities/weeding-hall-numbers.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WeedingHallService {

  constructor(
    @InjectRepository(WeedingHall)
    private weddingHallRepository: Repository<WeedingHall>,
    @InjectRepository(WeedingHallNumber)
    private weddingHallNumberRepository: Repository<WeedingHallNumber>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createWeedingHall(
    weedingHallDTO: CreateWeedingHallDTO,
    userId: number,
    logo: Express.Multer.File,
  ) {

    const weedingHallNumbersPromises: Promise<WeedingHallNumber>[] =
        weedingHallDTO.businessNumbers.map(async (number) => {
        const businessNumber = new WeedingHallNumber();
        businessNumber.phone = number;
        return await this.weddingHallNumberRepository.save(businessNumber);
      });

    const businessNumbers: WeedingHallNumber[] = await Promise.all(
      weedingHallNumbersPromises,
    );

    const newWeedingHall = new WeedingHall();
    newWeedingHall.business_name = weedingHallDTO.businessName;
    newWeedingHall.description = weedingHallDTO.description;
    newWeedingHall.facebook_url = weedingHallDTO.facebookUrl;
    newWeedingHall.instagram_url = weedingHallDTO.instagramUrl;
    newWeedingHall.zib_code = weedingHallDTO.zibCode;
    newWeedingHall.city = weedingHallDTO.city;
    newWeedingHall.street = weedingHallDTO.street;
    newWeedingHall.out_door = weedingHallDTO.outDoor;
    newWeedingHall.logo = logo.path;

    newWeedingHall.weeding_hall_numbers = businessNumbers;

    const vendor = await this.userRepository.findOneBy({id: userId})

    newWeedingHall.user = vendor;

    console.log(newWeedingHall);

    return this.weddingHallRepository.save(newWeedingHall);

  }

  async findAllWeedingHalls(){
    return await this.weddingHallRepository.find();
  }

  async findWeedingHallById(id: number) {
    return await this.weddingHallRepository.findOneBy({id: id});
  }

  async findVendorWeedingHall(vendorId: number) {
    return await this.weddingHallRepository.findOne({ where: { user: {id: vendorId}}})
  }
}
