import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { BusinessCategory } from 'src/business/entities-abstraction/budiness-category.entity';

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

  @Column()
  picture: string;

  @Column()
  phone_number: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ManyToOne(() => BusinessCategory, (business) => business.users)
  business_category: BusinessCategory;
}
