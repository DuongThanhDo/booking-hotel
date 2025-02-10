import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { CustomerEntity, ProfileEntity, StaffEntity } from '../entities';

export class UserDto {
  @IsString()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  role: string;

  @IsOptional()
  profile?: ProfileEntity;

  @IsOptional()
  customer?: CustomerEntity;

  @IsOptional()
  staff?: StaffEntity;
}
