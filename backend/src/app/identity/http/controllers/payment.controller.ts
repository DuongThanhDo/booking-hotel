import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentService } from '../../services';
import { CreatePaymentDto } from '../../dtos/creates';
import { UpdatePaymentDto } from '../../dtos/updates';

@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post(':id')
  create(@Param('id') id: string, @Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(id, createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  finById(@Param('id') id: string) {
    return this.paymentService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.paymentService.delete(id);
  }
}
