import { Entity, ManyToOne } from 'typeorm';
import { Barber } from './barber.entity'; 
import { BusinessPicture } from 'src/business/entities-abstraction/business-pictures';

@Entity()
export class BarberPictures extends BusinessPicture {

  @ManyToOne(() => Barber, (barber) => barber.barber_pictures) 
  barber: Barber;

}
