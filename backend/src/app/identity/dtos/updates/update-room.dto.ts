import { IsNumber, IsString } from 'class-validator';
import { StatusRoom } from 'src/common/constants/enum';

export class UpdateRoomDto {
  @IsString()
  room_number?: string;

  @IsString()
  type?: string;

  @IsNumber()
  price?: number;

  status?: StatusRoom;
}
