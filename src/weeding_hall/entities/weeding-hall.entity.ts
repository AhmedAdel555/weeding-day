import { Business } from 'src/business/entities-abstraction/business';
import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { WeedingHallMealsPackages } from './weeding-hall-meals-packages.entity';
import { WeedingHallSeatsPackages } from './weeding-hall-seats-packages.entity';
import { WeedingHallCustomPackages } from './weeding-hall-custom-packages.entity';
import { WeedingHallNumber } from './weeding-hall-numbers.entity';
import { WeedingHallPictures } from './weeding-hall-pictures.entity';
import { User } from 'src/users/entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity()
export class WeedingHall extends Business{

  @Column()
  out_door: boolean;

  @OneToMany(() => WeedingHallNumber, (weedingHallNumber) => weedingHallNumber.weeding_hall)
  weeding_hall_numbers: WeedingHallNumber[]

  @OneToMany(() => WeedingHallPictures, (weedingHallPicture) => weedingHallPicture.weeding_hall)
  weeding_hall_pictures: WeedingHallPictures[]

  @OneToOne(() => User)
  @JoinColumn()
  user: User

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

  @OneToMany(() => Order, (order) => order.weeding_hall)
  orders: Order[]

}
