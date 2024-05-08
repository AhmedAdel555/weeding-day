import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { MansSuit } from "./mans-suit.entity";

@Entity()
export class MansSuitCustomPackages{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    package_description: string;
  
    @Column()
    price: number;

    @ManyToMany(() => MansSuit, (mans_suit) => mans_suit.custom_packages)
    mans_suit: MansSuit;
}