import { Controller, Get } from "@nestjs/common";
import { BusinessService } from "./business.service";

@Controller('business')
export class BusinessController {
  constructor(private businessService: BusinessService){}
    
  @Get('/categories')
  async getAllBusinessCategories(){
     return await this.businessService.findAllBusinessCategories();
  }
}