import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class saveProductBeautySalonDTO{
    @IsString()
    @IsNotEmpty()
    packageBeautySalonDescription: string;

    @IsNumber()
    price: number;
}