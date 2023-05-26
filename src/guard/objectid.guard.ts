import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform<any> {
  transform(value: any): string {
    const isValid = value.isMongoId();
    console.log(isValid);
    if (!isValid) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return value;
  }
}
