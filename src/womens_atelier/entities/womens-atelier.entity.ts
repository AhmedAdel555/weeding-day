import { Business } from "src/business/entities-abstraction/business";
import { Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { WomensAtelierNumber } from "./womens-atelier-numbers.entity";
import { WomensAtelierPictures } from "./womens-atelier-pictures.entity";
import { User } from "src/users/entities/user.entity";
import { WomensAtelierProducts } from "./womens-atelier-products.entity";

@Entity()
export class WomensAtelier extends Business{

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @OneToMany(() => WomensAtelierNumber, (womensAtelierNumber) => womensAtelierNumber.womens_atelier)
    womens_atelier_numbers: WomensAtelierNumber[]
  
    @OneToMany(() => WomensAtelierPictures, (womensAtelierPictures) => womensAtelierPictures.womens_atelier)
    womens_atelier_pictures: WomensAtelierPictures[]

    @OneToMany(() => WomensAtelierProducts, (womensAtelierProducts) => womensAtelierProducts.womens_atelier)
    products: WomensAtelierProducts[]
}