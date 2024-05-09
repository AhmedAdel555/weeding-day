import { BusinessNumber } from "src/business/entities-abstraction/business-number";
import { Entity, ManyToOne } from "typeorm";
import { MansSuit } from "./mans-suit.entity";

@Entity()
export class MansSuitNumber extends BusinessNumber{
    @ManyToOne(() => MansSuit, (mans_suit) => mans_suit.mans_suit_numbers)
    mans_suit: MansSuit;
}