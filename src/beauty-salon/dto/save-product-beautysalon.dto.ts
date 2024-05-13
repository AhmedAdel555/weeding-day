import { IsNotEmpty, IsString } from "class-validator";

export class saveProductBeautySalonDTO{
    @IsString()
    @IsNotEmpty()
    productBeautySalonDescription: string;
}