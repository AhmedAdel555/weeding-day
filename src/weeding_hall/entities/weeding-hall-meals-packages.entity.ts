import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { WeedingHall } from './weeding-hall.entity';

@Entity()
export class WeedingHallMealsPackages{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  meals_count: number;

  @Column()
  price: number;

  @ManyToOne(() => WeedingHall, (weeding_hall) => weeding_hall.meals_packages)
  weeding_hall: WeedingHall;
}
