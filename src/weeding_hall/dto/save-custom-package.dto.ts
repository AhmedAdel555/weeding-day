import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SaveCustomPackageDTO {
  @IsString()
  @IsNotEmpty()
  packageDescription: string;

  @IsNumber()
  price: number;
}

