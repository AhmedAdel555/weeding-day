import { Entity, ManyToOne } from 'typeorm';
import { BusinessNumber } from  'src/business/entities-abstraction/business-number';
import { BeautySalon } from './beauty-salon.entity'; 
@Entity()
export class BeautySalonNumber extends BusinessNumber {

  @ManyToOne(() => BeautySalon, (beautySalon) => beautySalon.beauty_salon_numbers)
  beauty_salon: BeautySalon;

}
