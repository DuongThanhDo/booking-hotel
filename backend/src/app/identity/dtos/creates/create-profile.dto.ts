import { IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;
}
