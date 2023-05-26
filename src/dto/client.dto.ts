import {
  IsDefined,
  IsEmpty,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
  isNumber,
} from 'class-validator';
import { AddressDto } from './address.dto';
import { Type } from 'class-transformer';

export class ClientDto {
  @IsDefined({ groups: ['put'] })
  @IsString()
  @Length(4, 20)
  @IsNotEmpty({ groups: ['post'] })
  firstName: string;

  @IsDefined({ groups: ['put'] })
  @IsString()
  @Length(4, 20)
  @IsNotEmpty({ groups: ['post'] })
  lastName: string;

  @IsDefined({ groups: ['put'] })
  @IsNotEmpty({ groups: ['post'], message: "Phone can't be null" })
  @IsPhoneNumber('BO')
  @IsString()
  phone: string;

  @IsDefined({ groups: ['put'] })
  @ValidateNested()
  @IsNotEmpty({ groups: ['post'] })
  @Type(() => AddressDto)
  address: AddressDto;
}
