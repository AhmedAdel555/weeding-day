import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Barber } from './barber.entity'; 

@Entity()
export class BarberCustomPackages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  package_description: string;

  @Column()
  price: number;

  @ManyToOne(() => Barber, (barber) => barber.custom_packages) 
  barber: Barber;
}
