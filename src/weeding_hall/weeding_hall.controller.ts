import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { WeedingHallService } from './weeding_hall.service';
import CreateWeedingHallDTO from './dto/create-weeding-hall.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-guard';
import { SaveMealORSeatPackageDTO } from './dto/save-meal-or-seat-package.dto';
import { SaveCustomPackageDTO } from './dto/save-custom-package.dto';
import { WeedingHallMealsPackageService } from './weeding_hall-meals-packages.service';
import { WeedingHallSeatsPackageService } from './weeding_hall-seats-packages.service';
import { WeedingHallCustomPackageService } from './weeding_hall-custom-packages.service';

@Controller('weeding-hall')
export class WeedingHallController {
  constructor(private weedingHallService: WeedingHallService,
    private weedingHallMealsPackageService: WeedingHallMealsPackageService,
    private weedingHallSeatsPackageService: WeedingHallSeatsPackageService,
    private weedingHallCustomPackageService: WeedingHallCustomPackageService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './upload/business-logos',
        filename: (_req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: "png",
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    logo: Express.Multer.File,
    @Body() weedingHallDTO: CreateWeedingHallDTO,
    @Req() req: any,
  ) {
    return await this.weedingHallService.createWeedingHall(weedingHallDTO, req.user.usedId, logo);
  }

  @Get()
  async findAll() {
    return await this.weedingHallService.findAllWeedingHalls();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number){
     return await this.weedingHallService.findWeedingHallById(id);
  }

  @Get('/vendors/:vendorId')
  async findVendorWeedinghall(@Param('vendorId', ParseIntPipe) vendorId: number){
    return await this.weedingHallService.findVendorWeedingHall(vendorId);
  }

  @Post('meal-packages')
  async addMealsPackage(@Body() saveMealPackageDTO: SaveMealORSeatPackageDTO, @Req() req){
     await this.weedingHallMealsPackageService.createMealPackage(saveMealPackageDTO, req.user.userId);
  }

  @Put('meal-packages/:mealPackageId')
  async updateMealsPackage(@Body() saveMealPackageDTO: SaveMealORSeatPackageDTO, @Param('mealPackageId', ParseIntPipe) mealPackageId: number){
    await this.weedingHallMealsPackageService.updateMealPackage(saveMealPackageDTO, mealPackageId);
  }

  @Delete('meal-packages/:mealPackageId')
  async deleteMealsPackage(@Param('mealPackageId', ParseIntPipe) mealPackageId: number){
    await this.weedingHallMealsPackageService.deleteMealPackage(mealPackageId);
  }

  @Post('seat-packages')
  async addSeatPackage(@Body() saveSeatPackageDTO: SaveMealORSeatPackageDTO, @Req() req){
   await this.weedingHallSeatsPackageService.createSeatPackage(saveSeatPackageDTO, req.user.userId);
  }

  @Put('seat-packages/:seatPackageId')
  async updateSeatsPackage(@Body() saveSeatPackageDTO: SaveMealORSeatPackageDTO, @Param('seatPackageId', ParseIntPipe) seatPackageId: number){
    await this.weedingHallSeatsPackageService.updateSeatPackage(saveSeatPackageDTO, seatPackageId);
  }

  @Delete('seat-packages/:seatPackageId')
  async deleteSeatsPackage(@Param('seatPackageId', ParseIntPipe) seatPackageId: number){
    await this.weedingHallSeatsPackageService.deleteSeatPackage(seatPackageId);
  }

  @Post('custom-packages')
  async addCustomPackage(@Body() saveCustomPackageDTO: SaveCustomPackageDTO, @Req() req){
    await this.weedingHallCustomPackageService.createCustomPackage(saveCustomPackageDTO  , req.user.userId);
  }

  @Put('custom-packages/:customPackageId')
  async updateCustomPackage(@Body() saveCustomPackageDTO: SaveCustomPackageDTO, @Param('customPackageId', ParseIntPipe) customPackageId: number){
    await this.weedingHallCustomPackageService.updateCustomPackage(saveCustomPackageDTO , customPackageId);
  }

  @Delete('custom-packages/:customPackageId')
  async deleteCustomPackage(@Param('customPackageId', ParseIntPipe) customPackageId: number){
    await this.weedingHallCustomPackageService.deleteCustomPackage(customPackageId);
  }

}
