import { IsNotEmpty, IsNumber } from "class-validator";

export class SaveMealORSeatPackageDTO {

  @IsNumber()
  @IsNotEmpty()
  Count: number;

  @IsNumber()
  @IsNotEmpty()  
  price: number;

}