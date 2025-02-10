import { IsDate } from 'class-validator';
import { StatusBooking } from 'src/common/constants/enum';

export class UpdateBookingDto {
  @IsDate()
  check_in?: Date;

  @IsDate()
  check_out?: Date;

  status: StatusBooking;
}
