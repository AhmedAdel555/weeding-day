import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BusinessNumber } from './business-number.entity';
import { BusinessPicture } from './business-pictures.entity';
import { WeedingHall } from 'src/weeding_hall/entities/weeding-hall.entity';
import { BusinessCategory } from './budiness-category.entity';

@Entity()
export class Business {
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

  @OneToMany(() => BusinessNumber, (businessNumber) => businessNumber.business)
  business_numbers: BusinessNumber[]

  @OneToMany(
    () => BusinessPicture,
    (businessPicture) => businessPicture.business,
  )
  business_pictures: BusinessPicture[]

  @ManyToOne(() => BusinessCategory, (business) => business.business)
  business_category: BusinessCategory;

  @OneToOne(() => User, (user) => user.business)
  @JoinColumn()
  user: User
  
}