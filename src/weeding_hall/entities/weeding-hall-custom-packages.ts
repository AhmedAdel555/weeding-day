import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { WeedingHall } from './weeding-hall.entity';

@Entity()
export class WeedingHallCustomPackages{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  package_description: string;

  @Column()
  price: number;

  @ManyToOne(() => WeedingHall, (weeding_hall) => weeding_hall.custom_packages)
  weeding_hall: WeedingHall;
}
