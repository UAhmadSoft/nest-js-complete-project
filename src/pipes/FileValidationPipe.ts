import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    const oneKb = 1000;
    if (value.size > 70 * oneKb) {
      throw new BadRequestException('Validation failed');
    }

    return value;
  }

  // private toValidate(value: any, metatype: Function): boolean {
  //   const oneKb = 1000;
  //   return value.size < 70 * oneKb;
  // }
}
