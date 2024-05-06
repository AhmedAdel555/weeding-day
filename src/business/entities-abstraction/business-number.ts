import { PrimaryGeneratedColumn, Column } from 'typeorm';

export abstract class BusinessNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

}
