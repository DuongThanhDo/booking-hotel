import { BookingService } from './booking.service';
import { CreatePaymentDto } from '../dtos/creates/create-Payment.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from '../entities';
import { Repository } from 'typeorm';
import { UpdatePaymentDto } from '../dtos/updates';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
    private bookingService: BookingService,
  ) {}

  async create(
    id: string,
    createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentEntity | null> {
    const booking = await this.bookingService.findById(id);

    if (!booking) return null;

    const payment = await this.paymentRepository.save({
      ...createPaymentDto,
      booking,
    });

    booking.payments.push(payment.payment_id);

    return payment;
  }

  async findAll(): Promise<PaymentEntity[]> {
    return this.paymentRepository.find({ relations: ['booking'] });
  }

  async findById(id: string): Promise<PaymentEntity> {
    return this.paymentRepository.findOne({
      where: { payment_id: id },
      relations: ['booking'],
    });
  }

  async update(
    id: string,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<PaymentEntity | null> {
    const payment = await this.findById(id);
    if (!payment) return null;

    await this.paymentRepository.update(id, updatePaymentDto);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const payment = await this.findById(id);
    if (!payment) return false;

    this.paymentRepository.delete(id);
    return true;
  }
}
