import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SaveProductAtelierDTO{
    @IsString()
    @IsNotEmpty()
    productAtelierDescription: string;

  @IsNumber()
  @IsNotEmpty()
  saleAtelierPrice:number;

  @IsNumber()
  @IsNotEmpty()
  rentAtelierPrice:number;
}


