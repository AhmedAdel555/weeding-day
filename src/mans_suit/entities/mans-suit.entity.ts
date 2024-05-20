import { Business } from "src/business/entities-abstraction/business";
import { User } from "src/users/entities/user.entity";
import {Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { MansSuitNumber } from "./mans-suit-numbers.entity";
import { MansSuitProducts } from "./mans-suit-products.entity";
import { MansSuitPictures } from "./mans-suit-pictures.entity";
import { Order } from "src/orders/entities/order.entity";

@Entity()
export class MansSuit extends Business{

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @OneToMany(() => MansSuitNumber, (mansSuitNumber) => mansSuitNumber.mans_suit)
    mans_suit_numbers: MansSuitNumber[]
  
    @OneToMany(() => MansSuitPictures, (mansSuitPictures) => mansSuitPictures.mans_suit)
    mans_suit_pictures: MansSuitPictures[]

    @OneToMany(() => MansSuitProducts, (mansSuitProducts) => mansSuitProducts.mans_suit)
    products: MansSuitProducts[]

    @OneToMany(() => Order, (order) => order.man_suit)
    orders: Order[]
}