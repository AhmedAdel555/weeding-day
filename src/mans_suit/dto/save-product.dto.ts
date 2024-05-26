import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SaveProductDTO {
  @IsString()
  @IsNotEmpty()
  productDescription: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  salePrice: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  rentPrice: number;
}
