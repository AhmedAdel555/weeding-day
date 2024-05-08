import { Body, Controller, Get, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { WomensAtelierService } from './womens_atelier.service';
import { JwtAuthGuard } from 'src/auth/jwt-guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import CreateWomensAtelierDTO from './dto/create-womens-atelier.dto';

@Controller('womens-atelier')
export class WomensAtelierController {
    constructor(private womensAtelierService: WomensAtelierService){}

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
        @Body() womensAtelierDTo: CreateWomensAtelierDTO,
        @Req() req: any,
    ){
        return await this.womensAtelierService.createWomensAtelier(womensAtelierDTo, req.user.usedId, logo);
    }

  @Get()
  async findAll() {
    return await this.womensAtelierService.findAllWomensAteliers();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number){
     return await this.womensAtelierService.findWomensAtelierById(id);
  }

  @Get('/vendors/:vendorId')
  async findVendorWomensAtelier(@Param('vendorId', ParseIntPipe) vendorId: number){
    return await this.womensAtelierService.findVendorWomensAtelier(vendorId);
  }
}
