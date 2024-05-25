import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BeautySalonService } from './beauty-salon.service';
import CreateBeautySalonDTO from './dto/create-beauty-salon.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { saveProductBeautySalonDTO } from './dto/save-product-beautysalon.dto';
import { BeautySalonPackagesService } from './beauty-salon-packages.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('beauty-salon')
export class BeautySalonController {
  constructor(private beautySalonService: BeautySalonService,
    private beautySalonPackagesService: BeautySalonPackagesService
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
    @Body() beautySalonDTO: CreateBeautySalonDTO,
    @Req() req: any,
  ) {
    return await this.beautySalonService.createBeautySalon(beautySalonDTO, req.user.userId, logo);
  }

  @Get()
  async findAll() {
    return await this.beautySalonService.findAllBeautySalons();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number){
     return await this.beautySalonService.findBeautySalonById(id);
  }

  @Get('/vendors/:vendorId')
  async findVendorBeautySalon(@Param('vendorId', ParseIntPipe) vendorId: number){
    return await this.beautySalonService.findVendorBeautySalon(vendorId);
  }


  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Post('/images/upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './upload/beauty-salon-images',
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
    return await this.beautySalonService.uploadImage(image, req.user.userId);
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Post('packages')
  async addProductBeautySalon(
    @Body() prodctBeautySalonDTO: saveProductBeautySalonDTO,
    @Req() req
  ){
    await this.beautySalonPackagesService.addPackageBeautySalon(prodctBeautySalonDTO, req.user.userId);
    return "package addded successfuly"
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Put('packages/:packageId')
  async updateProductBeautySalon(
    @Body() prodctBeautySalonDTO: saveProductBeautySalonDTO,
    @Param('packageId', ParseIntPipe) packageId:number
  ){
    await this.beautySalonPackagesService.updatePackageBeautySalon(prodctBeautySalonDTO, packageId);
    return "package updated successfuly"
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Delete('packages/:packageId')
  async deletePackageBarber(@Param('packageId', ParseIntPipe) packageId: number){
    await this.beautySalonPackagesService.deletePackageSalon(packageId);
    return "package deleted successfuly"
  }
}
