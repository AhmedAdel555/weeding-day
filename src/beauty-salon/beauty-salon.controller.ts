import { Body, Controller, Get, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BeautySalonService } from './beauty-salon.service';
import CreateBeautySalonDTO from './dto/create-beauty-salon.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-guard';
import { saveProductBarberDTO } from 'src/barber/dto/save-product-barber.dto';
import { saveProductBeautySalonDTO } from './dto/save-product-beautysalon.dto';
import { BeautySalonPackagesService } from './beauty-salon-packages.service';

@Controller('beauty-salon')
export class BeautySalonController {
  constructor(private beautySalonService: BeautySalonService,
    private beautySalonPackagesService: BeautySalonPackagesService
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

  @UseGuards(JwtAuthGuard)
  @Post('products')
  async addProductBeautySalon(
    prodctBeautySalonDTO: saveProductBeautySalonDTO,
    @Req() req
  ){
    await this.beautySalonPackagesService.addPackageBeautySalon(prodctBeautySalonDTO, req.user.userId);
    return "package addded successfuly"
  }

  @UseGuards(JwtAuthGuard)
  @Put('prodcts/:productId')
  async updateProductBeautySalon(
    prodctBeautySalonDTO: saveProductBeautySalonDTO,
    @Param('productId', ParseIntPipe) productId:number
  ){
    await this.beautySalonPackagesService.updatePackageBeautySalon(prodctBeautySalonDTO, productId);
    return "package updated successfuly"
  }

  @Get(':beautySalon/products')
  async getBeautySalonProducts(@Param('beautySalonId', ParseIntPipe)beautySalonId: number){
    return this.beautySalonPackagesService.getBeautySalonPackages(beautySalonId);
  }
}
