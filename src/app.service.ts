import { Injectable, BadRequestException } from '@nestjs/common';
import { Blob } from './interfaces/blob.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  upload(folderPath: string, file: Blob) {
    const filePath = path.join(folderPath, file.originalname);

    fs.writeFile(filePath, file.buffer, (err) => {
      if (err) {
        throw new BadRequestException('Something went wrong!');
      }
    });
  }

  checkFolder(folderName: string) {
    const folderPath = path.resolve('src', folderName);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    return folderPath;
  }
}
