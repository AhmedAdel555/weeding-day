import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BarberService } from './barber.service'; 
import CreateBarberDTO from './dto/create-barber.dto'; 
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { saveProductBarberDTO } from './dto/save-package-barber.dto';
import { BarberPackagesService } from './barber-packages.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('barber') 
export class BarberController { 
  constructor(private barberService: BarberService, 
    private barberPackagesService: BarberPackagesService
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
    @Body() barberDTO: CreateBarberDTO,
    @Req() req: any,
  ) {
    return await this.barberService.createBarber(barberDTO, req.user.userId, logo); 
  }

  @Get()
  async findAll() {
    return await this.barberService.findAllBarbers(); 
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number){
     return await this.barberService.findBarberById(id); 
  }

  @Get('/vendors/:vendorId')
  async findVendorBarber(@Param('vendorId', ParseIntPipe) vendorId: number){
    return await this.barberService.findVendorBarber(vendorId); 
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Post('/images/upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './upload/barber-images',
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
    return await this.barberService.uploadImage(image, req.user.userId);
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Post('packages')
  async addpackageBarber(
    @Body() productBarberDTO: saveProductBarberDTO,
    @Req() req
  ){
    await this.barberPackagesService.addProductBarber(productBarberDTO, req.user.userId);
    return "package added successfuly"
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Put('packages/:packageId')
  async updatePackageBarber(
    @Body() productBarberDTO: saveProductBarberDTO,
    @Param('packageId', ParseIntPipe) packageId: number
  ){
    await this.barberPackagesService.updateProductBarber(productBarberDTO, packageId);
    return "package updated successfuly"
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Delete('packages/:packageId')
  async deletePackageBarber(@Param('packageId', ParseIntPipe) packageId: number){
    await this.barberPackagesService.deletePackageBarber(packageId);
    return "package deleted successfuly"
  }

}
