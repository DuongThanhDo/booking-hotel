import { IsNumber, IsString } from 'class-validator';
import { StatusPayment } from 'src/common/constants/enum';

export class CreatePaymentDto {
  @IsString()
  method: string;

  @IsNumber()
  amount: number;

  status: StatusPayment;
}
