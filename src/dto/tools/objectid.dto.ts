import { IsMongoId } from 'class-validator';

export class ObjectIdDto {
  @IsMongoId()
  id: string;
}
