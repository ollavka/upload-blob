import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { Blob } from './interfaces/blob.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('blob'))
  uploadBlob(@UploadedFile() file: Blob) {
    const folderPath = this.appService.checkFolder('files');

    this.appService.upload(folderPath, file);

    return { success: true };
  }
}
