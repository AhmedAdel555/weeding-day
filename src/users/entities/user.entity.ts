import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BusinessCategory } from 'src/business/entities-abstraction/business-category.entity';
import { Order } from 'src/orders/entities/order.entity';

export enum UserRole {
  ADMIN = 'admin',
  VENDOR = 'vendor',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  password: string;

  @Column({nullable: true})
  picture: string;

  @Column({ unique: true })
  phone_number: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ManyToOne(() => BusinessCategory, (business) => business.users)
  business_category: BusinessCategory;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]
}
