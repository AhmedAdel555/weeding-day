import { PrimaryGeneratedColumn, Column } from 'typeorm';

export abstract class BusinessPicture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  picture: string;
}
