import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SaveProductDTO {
  @IsString()
  @IsNotEmpty()
  productDescription: string;

  @IsNumber()
  @IsNotEmpty()
  salePrice:number;

  @IsNumber()
  @IsNotEmpty()
  rentPrice:number;
}
