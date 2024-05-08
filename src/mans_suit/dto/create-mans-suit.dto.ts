import { IsNotEmpty} from "class-validator";
import { CreateBusinessDTO } from "src/business/dto/create-business.dto";

class CreateMansSuitDTO extends CreateBusinessDTO{
    @IsNotEmpty()
    salePrice: number;

    @IsNotEmpty()
    rentPrice: number;
}

export default CreateMansSuitDTO;