import { BusinessPicture } from "src/business/entities-abstraction/business-pictures";
import { Entity, ManyToOne } from "typeorm";
import { WomensAtelier } from "./womens-atelier.entity";

@Entity()
export class WomensAtelierPictures extends BusinessPicture{

    @ManyToOne(() => WomensAtelier, (womens_atelier) => womens_atelier.womens_atelier_pictures)
    womens_atelier: WomensAtelier;
}