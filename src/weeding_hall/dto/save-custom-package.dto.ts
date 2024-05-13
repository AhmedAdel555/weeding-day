import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SaveCustomPackageDTO {
  @IsString()
  @IsNotEmpty()
  package_description: string;

  @IsNumber()
  price: number;
}

