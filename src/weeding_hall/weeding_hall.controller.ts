import {
  Body,
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
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

  constructor(private t: WeedingHallService) {}

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
    ) logo: Express.Multer.File,
    @Body() b: CreateWeedingHallDTO,
    @Req() req: any
  ) {
    return await this.t.createWeedingHall(b, req.user.id, logo);
  }
}
