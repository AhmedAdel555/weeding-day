import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BeautySalon } from './beauty-salon.entity';

@Entity()
export class BeautySalonCustomPackages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  package_description: string;

  @Column()
  price: number;

  @ManyToOne(() => BeautySalon, (beautySalon) => beautySalon.custom_packages)
  beauty_salon: BeautySalon;
}
