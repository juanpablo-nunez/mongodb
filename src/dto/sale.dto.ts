import { Prop } from '@nestjs/mongoose';
import {
  IsDefined,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class SaleDto {
  @IsDefined({ groups: ['patch'] })
  @IsString()
  @Length(4, 20)
  @IsNotEmpty({ groups: ['post'] })
  clientName: string;

  @IsDefined({ groups: ['patch'] })
  @IsString()
  @Length(4, 20)
  @IsNotEmpty({ groups: ['post'] })
  item: string;

  @IsDefined({ groups: ['patch'] })
  @IsNotEmpty({ groups: ['post'] })
  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(100)
  quantity: number;
}
