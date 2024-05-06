import { User } from 'src/users/entities/user.entity';
import {
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class Business {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  business_name: string

  @Column({ unique: true })
  logo: string

  @Column({ unique: true })
  description: string

  @Column()
  facebook_url: string

  @Column()
  instagram_url: string

  @Column({ unique: true })
  zib_code: number

  @Column({ unique: true })
  city: string

  @Column({ unique: true })
  street: string
  
}