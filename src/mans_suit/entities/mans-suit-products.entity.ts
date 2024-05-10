import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MansSuit } from "./mans-suit.entity";

@Entity()
export class MansSuitProducts{
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

    @ManyToOne(() => MansSuit, (mans_suit) => mans_suit.products)
    mans_suit: MansSuit;
}