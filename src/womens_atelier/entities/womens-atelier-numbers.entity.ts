import { BusinessNumber } from "src/business/entities-abstraction/business-number";
import { Entity, ManyToOne } from "typeorm";
import { WomensAtelier } from "./womens-atelier.entity";

@Entity()
export class WomensAtelierNumber extends BusinessNumber {

    @ManyToOne(() => WomensAtelier, (womens_atelier) => womens_atelier.womens_atelier_numbers)
    womens_atelier: WomensAtelier;
}