import { Body, Controller, Get, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BarberService } from './barber.service'; 
import CreateBarberDTO from './dto/create-barber.dto'; 
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-guard';

@Controller('barber') 
export class BarberController { 
  constructor(private barberService: BarberService) {} 

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
}
