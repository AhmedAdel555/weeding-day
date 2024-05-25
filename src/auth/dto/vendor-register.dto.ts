import { IsNumber } from "class-validator";
import { UserRegisterDTO } from "./user-register.dto";


export class VendorRegisterDTO extends UserRegisterDTO{
  @IsNumber()
  categoryId: number
}


