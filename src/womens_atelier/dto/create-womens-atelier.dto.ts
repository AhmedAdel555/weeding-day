import { IsNotEmpty, isNotEmpty } from "class-validator";
import { CreateBusinessDTO } from "src/business/dto/create-business.dto";

class CreateWomensAtelierDTO extends CreateBusinessDTO{
    @IsNotEmpty()
    salePrice: number;

    @IsNotEmpty()
    rentPrice: number;
}

export default CreateWomensAtelierDTO;
