import {
  Body,
  Controller,
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
import { MansSuitService } from './mans_suit.service';
import { JwtAuthGuard } from 'src/auth/jwt-guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import CreateMansSuitDTO from './dto/create-mans-suit.dto';
import { SaveProductDTO } from './dto/save-product.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('mans-suit')
export class MansSuitController {
  constructor(private mansSuitService: MansSuitService) {}

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
          fileType: 'png',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    logo: Express.Multer.File,
    @Body() mansSuitTDO: CreateMansSuitDTO,
    @Req() req: any,
  ) {
    return await this.mansSuitService.createMansSuit(
      mansSuitTDO,
      req.user.usedId,
      logo,
    );
  }

  @Get()
  async findAll() {
    return await this.mansSuitService.findAllMansSuit();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.mansSuitService.findMansSuitById(id);
  }


  @Get('vendors/:vendorId')
  async findVendorMansSuit(@Param('vendorId', ParseIntPipe) vendorId: number) {
    return await this.mansSuitService.findVendorMansSuit(vendorId);
  }

  @UseGuards(JwtAuthGuard)
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
  async addProduct(
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
    productDTO: SaveProductDTO,
    @Req() req,
  ) {
    await this.mansSuitService.addProduct(productDTO, req.user.userId, picture);
    return "product added successfully"
  }

  @UseGuards(JwtAuthGuard)
  @Put('products/:productId')
  async updateProduct(
    productDTO: SaveProductDTO,
    @Param('productId', ParseIntPipe) productId: number  
  ) {
    await this.mansSuitService.updateProduct(productDTO, productId);
    return "product updated successfully"
  }


  @Get(':mansSuitId/products')
  async getMansSuitProducts(@Param('mansSuitId', ParseIntPipe) mansSuitId: number){
      return this.mansSuitService.getMansSuitProducts(mansSuitId);
  }

}
