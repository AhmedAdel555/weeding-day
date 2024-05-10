import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WomensAtelier } from "./womens-atelier.entity";

@Entity()
export class WomensAtelierProducts{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_description: string;

    @Column()
    sale_price:number;

    @Column()
    rent_price:number;

    @Column()
    picture: string;

    @ManyToOne(() => WomensAtelier, (womens_atelier) => womens_atelier.products)
    womens_atelier: WomensAtelier;
}