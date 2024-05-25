import {
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class Business {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  business_name: string

  @Column()
  logo: string

  @Column()
  description: string

  @Column({nullable: true})
  facebook_url: string

  @Column({nullable: true})
  instagram_url: string

  @Column()
  zib_code: number

  @Column()
  city: string

  @Column()
  street: string
  
}