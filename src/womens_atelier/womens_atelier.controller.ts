import { Body, Controller, Get, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { WomensAtelierService } from './womens_atelier.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import CreateWomensAtelierDTO from './dto/create-womens-atelier.dto';
import { SaveProductAtelierDTO } from './dto/save-product-atelier.dto';
import { WomensAtelierProductsService } from './womans_atelier-products.service';

@Controller('womens-atelier')
export class WomensAtelierController {
    constructor(private womensAtelierService: WomensAtelierService,
      private womansAtelierProductsService: WomensAtelierProductsService
    ){}

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

  @Post('products')
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './upload/products-pictures',
        filename: (_req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )


  async addProductAtelier(
    @UploadedFile(
        new ParseFilePipeBuilder()
        .addFileTypeValidator({
            fileType: 'png',
        })
        .build({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    picture: Express.Multer.File,
    productAtelierDTO: SaveProductAtelierDTO,
    @Req() req,
  ){
    await this.womansAtelierProductsService.addProductAtelier(productAtelierDTO, req.user.usedId, picture);
    return "product added successfuly"
  }

  @Put('products/:productId')
  async updateProductAtelier(
    productAtelierDTO: SaveProductAtelierDTO,
    @Param('productId', ParseIntPipe) productId: number
  ){
    await this.womansAtelierProductsService.updateProductAtelier(productAtelierDTO, productId);
    return "product updated successfuly"
  }

  @Get(':womansAtelier/products')
  async getWomansAtelierProducts(@Param('womansAtelierId', ParseIntPipe) womensAtelierId: number){
    return this.womansAtelierProductsService.getWomansAtelierProducts(womensAtelierId);
  }

}
