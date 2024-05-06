import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { WeedingHallService } from './weeding_hall.service';
import CreateWeedingHallDTO from './dto/create-weeding-hall.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-guard';

@Controller('weeding-hall')
export class WeedingHallController {
  constructor(private weedingHallService: WeedingHallService) {}

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
          fileType: /\.(png|jpe?g)$/,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    logo: Express.Multer.File,
    @Body() weedingHallDTO: CreateWeedingHallDTO,
    @Req() req: any,
  ) {
    return await this.weedingHallService.createWeedingHall(weedingHallDTO, req.user.id, logo);
  }

  @Get()
  async findAll() {
    return await this.weedingHallService.findAllWeedingHalls();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number){
     return await this.weedingHallService.findWeedingHallById(id);
  }

  @Get('/vendors/:vendorId')
  async findVendorWeedinghall(@Param('vendorId', ParseIntPipe) vendorId: number){
    return await this.weedingHallService.findVendorWeedingHall(vendorId);
  }
}
