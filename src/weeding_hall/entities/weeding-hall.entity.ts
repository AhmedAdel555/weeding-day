import { Business } from 'src/business/entities/business.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { WeedingHallMealsPackages } from './weeding-hall-meals-packages.entity';
import { WeedingHallSeatsPackages } from './weeding-hall-seats-packages.entity';
import { WeedingHallCustomPackages } from './weeding-hall-custom-packages';

@Entity()
export class WeedingHall {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  out_door: boolean;

  @OneToOne(() => Business)
  @JoinColumn()
  business: Business

  @OneToMany(
    () => WeedingHallMealsPackages,
    (weedingHallMealsPackages) => weedingHallMealsPackages.weeding_hall,
  )
  meals_packages: WeedingHallMealsPackages[]

  @OneToMany(
    () => WeedingHallSeatsPackages,
    (weedingHallSeatsPackages) => weedingHallSeatsPackages.weeding_hall,
  )
  seats_packages: WeedingHallSeatsPackages[]

  @OneToMany(
    () => WeedingHallCustomPackages,
    (weedingHallCustomPackages) => weedingHallCustomPackages.weeding_hall,
  )
  custom_packages: WeedingHallCustomPackages[]
}
