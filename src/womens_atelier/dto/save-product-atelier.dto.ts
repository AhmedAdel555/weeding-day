import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SaveProductAtelierDTO{
  @IsString()
  @IsNotEmpty()
  productDescription: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  salePrice:number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  rentPrice:number;
}


