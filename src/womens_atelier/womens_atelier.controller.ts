import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { WomensAtelierService } from './womens_atelier.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import CreateWomensAtelierDTO from './dto/create-womens-atelier.dto';
import { SaveProductAtelierDTO } from './dto/save-product-atelier.dto';
import { WomensAtelierProductsService } from './womans_atelier-products.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('womens-atelier')
export class WomensAtelierController {
    constructor(private womensAtelierService: WomensAtelierService,
      private womansAtelierProductsService: WomensAtelierProductsService
    ){}

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
        @Body() womensAtelierDTo: CreateWomensAtelierDTO,
        @Req() req: any,
    ){
        return await this.womensAtelierService.createWomensAtelier(womensAtelierDTo, req.user.userId, logo);
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


  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Post('/images/upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './upload/atelier-images',
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
    return await this.womensAtelierService.uploadImage(image, req.user.userId);
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
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
          fileType: /png|jpg|jpeg/,
        })
        .build({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    picture: Express.Multer.File,
    @Body() productAtelierDTO: SaveProductAtelierDTO,
    @Req() req,
  ){
    await this.womansAtelierProductsService.addProductAtelier(productAtelierDTO, req.user.userId, picture);
    return "product added successfuly"
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Put('products/:productId')
  async updateProductAtelier(
    @Body() productAtelierDTO: SaveProductAtelierDTO,
    @Param('productId', ParseIntPipe) productId: number
  ){
    await this.womansAtelierProductsService.updateProductAtelier(productAtelierDTO, productId);
    return "product updated successfuly"
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Delete('products/:productId')
  async deleteProductAtelier(
    @Param('productId', ParseIntPipe) productId: number
  ){
    await this.womansAtelierProductsService.deleteProduct(productId);
    return "product deleted successfuly"
  }

}
