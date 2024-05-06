import { Injectable } from '@nestjs/common';
import { Business } from 'src/business/entities/business.entity';
import { WeedingHall } from './entities/weeding-hall.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessService } from 'src/business/business.service';
import CreateWeedingHallDTO from './dto/create-weeding-hall.dto';

@Injectable()
export class WeedingHallService {
  constructor(
    @InjectRepository(WeedingHall)
    private weddingHallRepository: Repository<WeedingHall>,
    private businessService: BusinessService,
  ) {}

  async createWeedingHall(
    weedingHallDTO: CreateWeedingHallDTO,
    userId: number,
    logo: Express.Multer.File,
  ) {

    const newBusiness: Business = await this.businessService.createBusiness(
      weedingHallDTO,
      userId,
      logo,
    )

    const newWeeding = new WeedingHall();
    newWeeding.business = newBusiness;
    newWeeding.out_door = weedingHallDTO.outDoor;

    await this.weddingHallRepository.save(newWeeding);

  }
}
