import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Business } from './business.entity';

export enum BusinessCategoryTypes {
  WEEDINGHALL = 'weeding hall',
  BARBER = 'barber',
  BEAUTYSALON = 'beauty salon',
  MANSUIT = 'man suit',
  WOMENATELIER = 'women atelier'
}

@Entity()
export class BusinessCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_name: BusinessCategoryTypes;

  @OneToMany(() => Business, (business) => business.business_category)
  business: Business;
}
