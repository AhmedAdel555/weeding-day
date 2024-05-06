import { IsNotEmpty } from 'class-validator';
import {CreateBusinessDTO}  from 'src/business/dto/create-business.dto';

class CreateWeedingHallDTO extends CreateBusinessDTO{
  @IsNotEmpty()
  outDoor: boolean;
}

export default CreateWeedingHallDTO;