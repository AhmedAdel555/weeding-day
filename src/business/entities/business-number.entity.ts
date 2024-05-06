import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Business } from './business.entity';

@Entity()
export class BusinessNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @ManyToOne(() => Business, (business) => business.business_numbers)
  business: Business;
}
