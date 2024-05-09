import { Body, Controller, Get, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { MansSuitService } from './mans_suit.service';
import { JwtAuthGuard } from 'src/auth/jwt-guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import CreateMansSuitDTO from './dto/create-mans-suit.dto';

@Controller('mans-suit')
export class MansSuitController {
    constructor(private mansSuitService: MansSuitService){}

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
        @Body() mansSuitTDO: CreateMansSuitDTO,
        @Req() req: any,
    ){
        return await this.mansSuitService.createMansSuit(mansSuitTDO, req.user.usedId, logo);
    }

 @Get()
  async findAll() {
    return await this.mansSuitService.findAllMansSuit();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number){
     return await this.mansSuitService.findMansSuitById(id);
  }

  @Get('/vendors/:vendorId')
  async findVendorMansSuit(@Param('vendorId', ParseIntPipe) vendorId: number){
    return await this.mansSuitService.findVendorMansSuit(vendorId);
  }
}
