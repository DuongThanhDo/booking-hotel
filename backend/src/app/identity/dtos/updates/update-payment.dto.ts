import { IsNumber, IsString } from 'class-validator';
import { StatusPayment } from 'src/common/constants/enum';

export class UpdatePaymentDto {
  @IsString()
  method?: string;

  @IsNumber()
  amount?: number;

  status?: StatusPayment;
}
