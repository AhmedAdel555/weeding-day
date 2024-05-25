import { Injectable } from '@nestjs/common';
import { Business } from 'src/business/entities-abstraction/business';
import { WeedingHall } from './entities/weeding-hall.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import CreateWeedingHallDTO from './dto/create-weeding-hall.dto';
import { WeedingHallNumber } from './entities/weeding-hall-numbers.entity';
import { User } from 'src/users/entities/user.entity';
import { WeedingHallPictures } from './entities/weeding-hall-pictures.entity';

@Injectable()
export class WeedingHallService {

  constructor(
    @InjectRepository(WeedingHall)
    private weddingHallRepository: Repository<WeedingHall>,
    @InjectRepository(WeedingHallNumber)
    private weddingHallNumberRepository: Repository<WeedingHallNumber>,
    @InjectRepository(WeedingHallPictures)
    private weddingHallPictureRepository: Repository<WeedingHallPictures>,
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

    return this.weddingHallRepository.save(newWeedingHall);

  }

  async uploadImage(image: Express.Multer.File, vendorId: number){
    const weedingHall = await this.weddingHallRepository.findOneBy({ user: {id: vendorId}})
    const newPicture = new WeedingHallPictures();
    newPicture.picture = image.path;
    newPicture.weeding_hall = weedingHall;
    return this.weddingHallPictureRepository.save(newPicture);
  }

  async findAllWeedingHalls(){
    return await this.weddingHallRepository.find();
  }

  async findWeedingHallById(id: number) {
    return await this.weddingHallRepository.findOne({ where: {id: id}, relations: ['user', 'weeding_hall_numbers', 'weeding_hall_pictures', 'meals_packages', 'seats_packages', 'custom_packages']});
  }

  async findVendorWeedingHall(vendorId: number) {
    return await this.weddingHallRepository.findOne({ where: { user: {id: vendorId}}, relations: ['weeding_hall_numbers', 'weeding_hall_pictures', 'meals_packages', 'seats_packages', 'custom_packages']})
  }
}
