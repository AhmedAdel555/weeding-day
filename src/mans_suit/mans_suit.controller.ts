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
import { MansSuitService } from './mans_suit.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import CreateMansSuitDTO from './dto/create-mans-suit.dto';
import { SaveProductDTO } from './dto/save-product.dto';
import { MansSuitProductsService } from './mans_suit-products.service';
import { Roles } from 'src/decorators/roles.decorator';
import { User, UserRole } from 'src/users/entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('mans-suit')
export class MansSuitController {
  constructor(private mansSuitService: MansSuitService,
    private manSuitProductService: MansSuitProductsService
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
    @Body() mansSuitTDO: CreateMansSuitDTO,
    @Req() req: any,
  ) {
    return await this.mansSuitService.createMansSuit(
      mansSuitTDO,
      req.user.userId,
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


  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Post('/images/upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './upload/man-suit-images',
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
    return await this.mansSuitService.uploadImage(image, req.user.userId);
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
  async addProduct(
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
    @Body() productDTO: SaveProductDTO,
    @Req() req,
  ) {
    await this.manSuitProductService.addProduct(productDTO, req.user.userId, picture);
    return "product added successfully"
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Put('products/:productId')
  async updateProduct(
    @Body() productDTO: SaveProductDTO,
    @Param('productId', ParseIntPipe) productId: number  
  ) {
    await this.manSuitProductService.updateProduct(productDTO, productId);
    return "product updated successfully"
  }

  @Roles([UserRole.VENDOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Delete('products/:productId')
  async deleteProduct(
    @Param('productId', ParseIntPipe) productId: number  
  ) {
    await this.manSuitProductService.deleteProduct(productId);
    return "product deleted successfully"
  }
}
