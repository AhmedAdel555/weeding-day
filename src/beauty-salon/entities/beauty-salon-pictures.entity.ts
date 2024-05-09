import { Entity, ManyToOne } from 'typeorm';
import { BeautySalon } from './beauty-salon.entity'; 
import { BusinessPicture } from 'src/business/entities-abstraction/business-pictures';

@Entity()
export class BeautySalonPictures extends BusinessPicture {

  @ManyToOne(() => BeautySalon, (beautySalon) => beautySalon.beauty_salon_pictures)
  beauty_salon: BeautySalon;

}
