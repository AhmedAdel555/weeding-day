import { BusinessPicture } from "src/business/entities-abstraction/business-pictures";
import { Entity, ManyToOne } from "typeorm";
import { MansSuit } from "./mans-suit.entity";

@Entity()
export class MansSuitPictures extends BusinessPicture{
    @ManyToOne(() => MansSuit, (mans_suit) => mans_suit.mans_suit_pictures)
    mans_suit: MansSuit;
}