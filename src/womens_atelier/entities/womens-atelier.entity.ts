import { Business } from "src/business/entities-abstraction/business";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { WomensAtelierNumber } from "./womens-atelier-numbers.entity";
import { WomensAtelierPictures } from "./womens-atelier-pictures.entity";
import { User } from "src/users/entities/user.entity";
import { WomensAtelierCustomPackages } from "./womens-atelier-custom-packages";

@Entity()
export class WomensAtelier extends Business{
    @Column()
    sale_price:number;

    @Column()
    rent_price:number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @OneToMany(() => WomensAtelierNumber, (womensAtelierNumber) => womensAtelierNumber.womens_atelier)
    womens_atelier_numbers: WomensAtelierNumber[]
  

    @OneToMany(() => WomensAtelierPictures, (womensAtelierPictures) => womensAtelierPictures.womens_atelier)
    womens_atelier_pictures: WomensAtelierPictures[]

    @OneToMany(() => WomensAtelierCustomPackages, (womensAtelierCustomPackages) => womensAtelierCustomPackages.womens_atelier)
    custom_packages: WomensAtelierCustomPackages[]
}