import { BusinessNumber } from 'src/business/entities-abstraction/business-number';
import { Entity, ManyToOne } from 'typeorm';
import { WeedingHall } from './weeding-hall.entity';

@Entity()
export class WeedingHallNumber extends BusinessNumber {


  @ManyToOne(() => WeedingHall, (weeding_hall) => weeding_hall.weeding_hall_numbers)
  weeding_hall: WeedingHall;

}
