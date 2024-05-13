import { IsNotEmpty, IsString } from "class-validator";

export class saveProductBarberDTO{
    @IsString()
    @IsNotEmpty()
    productBarberDescription: string;
}