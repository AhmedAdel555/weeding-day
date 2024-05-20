import { Business } from 'src/business/entities-abstraction/business';
import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BeautySalonCustomPackages } from './beauty-salon-custom-packages.entity';
import { BeautySalonNumber } from './beauty-salon-numbers.entity';
import { BeautySalonPictures } from './beauty-salon-pictures.entity';
import { User } from 'src/users/entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';



@Entity()
export class BeautySalon extends Business {



  @OneToMany(() => BeautySalonNumber, (beautySalonNumber) => beautySalonNumber.beauty_salon)
  beauty_salon_numbers: BeautySalonNumber[];

  @OneToMany(() => BeautySalonPictures, (beautySalonPicture) => beautySalonPicture.beauty_salon)
  beauty_salon_pictures: BeautySalonPictures[];

  @OneToMany(() => BeautySalonCustomPackages, (beautySalonCustomPackages) => beautySalonCustomPackages.beauty_salon)
  custom_packages: BeautySalonCustomPackages[];

  @OneToOne(() => User)
  @JoinColumn()
  user: User

  @OneToMany(() => Order, (order) => order.beauty_salon)
  orders: Order[]

}
