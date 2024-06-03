import { Barber } from "src/barber/entities/barber.entity";
import { BeautySalon } from "src/beauty-salon/entities/beauty-salon.entity";
import { MansSuit } from "src/mans_suit/entities/mans-suit.entity";
import { User } from "src/users/entities/user.entity";
import { WeedingHall } from "src/weeding_hall/entities/weeding-hall.entity";
import { WomensAtelier } from "src/womens_atelier/entities/womens-atelier.entity";
import { Column, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";

export enum OrderStatus {
  PENDING="pending",
  ACCEPTED="accepted",
  REJECTED="rejected"
} 

@Entity()
export class Order {
      
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  price: number;

  @Column()
  service_name: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus

  @Column()
  cardNumber: string;  
  
  @Column()
  cardDate: string;  
  
  @Column()
  cardCVV: string;  
  
  @Column()
  cardName: string;

  @ManyToOne(() => WeedingHall, (weeding_hall) => weeding_hall.orders)
  weeding_hall: WeedingHall;

  @ManyToOne(() => Barber, (barber) => barber.orders)
  barber: Barber;

  @ManyToOne(() => BeautySalon, (beautySalon) => beautySalon.orders)
  beauty_salon: BeautySalon;
  
  @ManyToOne(() => MansSuit, (manSuit) => manSuit.orders)
  man_suit: MansSuit;

  @ManyToOne(() => WomensAtelier, (womensAtelier) => womensAtelier.orders)
  women_atelier: WomensAtelier;

  @ManyToOne(() => User, (user) => user.orders)
  user: User
}