import { Entity, ManyToOne } from 'typeorm';
import { WeedingHall } from './weeding-hall.entity';
import { BusinessPicture } from 'src/business/entities-abstraction/business-pictures';

@Entity()
export class WeedingHallPictures extends BusinessPicture {


  @ManyToOne(() => WeedingHall, (weeding_hall) => weeding_hall.weeding_hall_pictures)
  weeding_hall: WeedingHall;

}
