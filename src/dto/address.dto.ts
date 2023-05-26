import {
  IsDefined,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';

export class AddressDto {
  @IsDefined({ groups: ['put'] })
  @IsString()
  @Length(3, 20)
  @IsNotEmpty({ groups: ['post'] })
  city: string;

  @IsDefined({ groups: ['put'] })
  @IsString()
  @Length(3, 20)
  @IsNotEmpty({ groups: ['post'] })
  zone: string;

  @IsDefined({ groups: ['put'] })
  @IsString()
  @Length(3, 20)
  @IsNotEmpty({ groups: ['post'] })
  street: string;
}
