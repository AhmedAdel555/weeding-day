import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WomensAtelier } from "./womens-atelier.entity";

@Entity()
export class WomensAtelierCustomPackages{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    package_description: string;
  
    @Column()
    price: number;

    @ManyToOne(() => WomensAtelier, (womens_atelier) => womens_atelier.custom_packages)
    womens_atelier: WomensAtelier;
}