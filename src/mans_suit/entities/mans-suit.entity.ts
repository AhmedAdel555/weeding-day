import { Business } from "src/business/entities-abstraction/business";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { MansSuitNumber } from "./mans-suit-numbers.entity";
import { MansSuitCustomPackages } from "./mans-suit-custom-packages.entity";
import { MansSuitPictures } from "./mans-suit-pictures.entity";

@Entity()
export class MansSuit extends Business{
    @Column()
    sale_price:number;

    @Column()
    rent_price:number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @OneToMany(() => MansSuitNumber, (mansSuitNumber) => mansSuitNumber.mans_suit)
    mans_suit_numbers: MansSuitNumber[]
  
    @OneToMany(() => MansSuitPictures, (mansSuitPictures) => mansSuitPictures.mans_suit)
    mans_suit_pictures: MansSuitPictures[]

    @OneToMany(() => MansSuitCustomPackages, (mansSuitCustomPackages) => mansSuitCustomPackages.mans_suit)
    custom_packages: MansSuitCustomPackages[]
}