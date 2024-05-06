import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Business } from './business';
import { User } from 'src/users/entities/user.entity';

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

  @OneToMany(() => User, (user) => user.business_category)
  users: User[];
}
