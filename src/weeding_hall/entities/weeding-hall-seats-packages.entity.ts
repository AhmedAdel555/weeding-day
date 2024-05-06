import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { WeedingHall } from './weeding-hall.entity';

@Entity()
export class WeedingHallSeatsPackages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seats_count: number;

  @Column()
  price: number;

  @ManyToOne(() => WeedingHall, (weeding_hall) => weeding_hall.seats_packages)
  weeding_hall: WeedingHall;
}
