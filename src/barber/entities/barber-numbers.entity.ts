import { Entity, ManyToOne } from 'typeorm';
import { BusinessNumber } from  'src/business/entities-abstraction/business-number';
import { Barber } from './barber.entity'; 

@Entity()
export class BarberNumber extends BusinessNumber {

  @ManyToOne(() => Barber, (barber) => barber.barber_numbers) 
  barber: Barber;

}
