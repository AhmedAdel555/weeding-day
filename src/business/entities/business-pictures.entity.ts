import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Business } from './business.entity';

@Entity()
export class BusinessPicture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  picture: string;

  @ManyToOne(() => Business, (business) => business.business_pictures)
  business: Business;
}
