import { Injectable } from "@nestjs/common";
import { BusinessCategory } from "./entities-abstraction/business-category.entity";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class BusinessService {
   constructor(
    @InjectRepository(BusinessCategory) 
    private businessCategoriesRepository: Repository<BusinessCategory>, 
   ){}


   async findAllBusinessCategories(){
    return await this.businessCategoriesRepository.find();
   }
}
