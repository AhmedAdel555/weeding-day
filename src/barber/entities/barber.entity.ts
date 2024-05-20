import { Business } from 'src/business/entities-abstraction/business';
import { Entity, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BarberCustomPackages } from './barber-custom-packages.entity'; 
import { BarberPictures } from './barber-pictures.entity';
import { BarberNumber } from './barber-numbers.entity';
import { User } from 'src/users/entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity()
export class Barber extends Business {

  @OneToMany(() => BarberNumber, (barberNumber) => barberNumber.barber)
  barber_numbers: BarberNumber[];

  @OneToMany(() => BarberPictures, (barberPicture) => barberPicture.barber)
  barber_pictures: BarberPictures[];

  @OneToMany(() => BarberCustomPackages, (barberCustomPackages) => barberCustomPackages.barber)
  custom_packages: BarberCustomPackages[];

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Order, (order) => order.barber)
  orders: Order[]
}
