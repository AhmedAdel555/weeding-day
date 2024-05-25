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
import { SaveMealORSeatPackageDTO } from './dto/save-meal-or-seat-package.dto';
import { SaveCustomPackageDTO } from './dto/save-custom-package.dto';
import { WeedingHallMealsPackageService } from './weeding_hall-meals-packages.service';
import { WeedingHallSeatsPackageService } from './weeding_hall-seats-packages.service';
import { WeedingHallCustomPackageService } from './weeding_hall-custom-packages.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('weeding-hall')
export class WeedingHallController {
  constructor(private weedingHallService: WeedingHallService,
    private weedingHallMealsPackageService: WeedingHallMealsPackageService,
    private weedingHallSeatsPackageService: WeedingHallSeatsPackageService,
    private weedingHallCustomPackageService: WeedingHallCustomPackageService
  ) {}

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Post()
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
          fileType: /png|jpg|jpeg/,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    logo: Express.Multer.File,
    @Body() weedingHallDTO: CreateWeedingHallDTO,
    @Req() req: any,
  ) {
    return await this.weedingHallService.createWeedingHall(weedingHallDTO, req.user.userId, logo);
  }


  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Post('/images/upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './upload/weeding-hall-images',
        filename: (_req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async uploadImageForWeedingHall(@UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: /png|jpg|jpeg/,
      })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
  )
  image: Express.Multer.File, @Req() req){
    return await this.weedingHallService.uploadImage(image, req.user.userId);
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

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Post('meal-packages')
  async addMealsPackage(@Body() saveMealPackageDTO: SaveMealORSeatPackageDTO, @Req() req){
    return await this.weedingHallMealsPackageService.createMealPackage(saveMealPackageDTO, req.user.userId);
     
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Put('meal-packages/:mealPackageId')
  async updateMealsPackage(@Body() saveMealPackageDTO: SaveMealORSeatPackageDTO, @Param('mealPackageId', ParseIntPipe) mealPackageId: number){
    return await this.weedingHallMealsPackageService.updateMealPackage(saveMealPackageDTO, mealPackageId);
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Delete('meal-packages/:mealPackageId')
  async deleteMealsPackage(@Param('mealPackageId', ParseIntPipe) mealPackageId: number){
    return await this.weedingHallMealsPackageService.deleteMealPackage(mealPackageId);
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Post('seat-packages')
  async addSeatPackage(@Body() saveSeatPackageDTO: SaveMealORSeatPackageDTO, @Req() req){
     return await this.weedingHallSeatsPackageService.createSeatPackage(saveSeatPackageDTO, req.user.userId);
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Put('seat-packages/:seatPackageId')
  async updateSeatsPackage(@Body() saveSeatPackageDTO: SaveMealORSeatPackageDTO, @Param('seatPackageId', ParseIntPipe) seatPackageId: number){
    return await this.weedingHallSeatsPackageService.updateSeatPackage(saveSeatPackageDTO, seatPackageId);
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Delete('seat-packages/:seatPackageId')
  async deleteSeatsPackage(@Param('seatPackageId', ParseIntPipe) seatPackageId: number){
    return await this.weedingHallSeatsPackageService.deleteSeatPackage(seatPackageId);
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Post('custom-packages')
  async addCustomPackage(@Body() saveCustomPackageDTO: SaveCustomPackageDTO, @Req() req){
    return await this.weedingHallCustomPackageService.createCustomPackage(saveCustomPackageDTO  , req.user.userId);
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Put('custom-packages/:customPackageId')
  async updateCustomPackage(@Body() saveCustomPackageDTO: SaveCustomPackageDTO, @Param('customPackageId', ParseIntPipe) customPackageId: number){
    return await this.weedingHallCustomPackageService.updateCustomPackage(saveCustomPackageDTO , customPackageId);
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Delete('custom-packages/:customPackageId')
  async deleteCustomPackage(@Param('customPackageId', ParseIntPipe) customPackageId: number){
    return await this.weedingHallCustomPackageService.deleteCustomPackage(customPackageId);
  }

}
