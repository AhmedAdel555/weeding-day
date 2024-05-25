import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class saveProductBarberDTO{
    @IsString()
    @IsNotEmpty()
    packageDescription: string;

    @IsNumber()
    price: number;
}