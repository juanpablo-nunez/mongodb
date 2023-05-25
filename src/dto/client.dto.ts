import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AddressDto } from './address.dto';

export class ClientDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsNumber()
  @IsNotEmpty()
  phone: number;
  @IsNotEmpty()
  address: AddressDto;
}
