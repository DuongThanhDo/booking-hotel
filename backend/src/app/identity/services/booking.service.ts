import { CustomerService } from './customer.service';
import { UpdateBookingDto } from './../dtos/updates/update-booking.dto';
import { CreateBookingDto } from './../dtos/creates/create-booking.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity, RoomEntity } from '../entities';
import { RoomService } from './room.service';
import { Repository } from 'typeorm';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private bookingRepository: Repository<BookingEntity>,
    private customerService: CustomerService,
    private roomService: RoomService,
  ) {}

  async create(body: {
    createBookingDto: CreateBookingDto;
    customer_id: string;
    rooms_id: string[];
  }): Promise<BookingEntity | null> {
    const customer = await this.customerService.findById(body.customer_id);
    if (!customer) return null;

    const rooms = await Promise.all(
      body.rooms_id.map(async (room_id) => {
        const room = await this.roomService.findById(room_id);
        return room ? room : null;
      }),
    );

    const validRooms = rooms.filter((room) => room !== null) as RoomEntity[];

    try {
      return await this.bookingRepository.save({
        ...body.createBookingDto,
        customer,
        rooms: validRooms,
        payments: [],
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      return null;
    }
  }

  async findAll(): Promise<BookingEntity[]> {
    return this.bookingRepository.find({
      relations: ['customer', 'rooms', 'payments'],
    });
  }

  async findById(id: string): Promise<BookingEntity> {
    return this.bookingRepository.findOne({
      where: { booking_id: id },
      relations: ['customer', 'rooms', 'payments'],
    });
  }

  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<BookingEntity | null> {
    const room = await this.findById(id);
    if (!room) return null;

    await this.bookingRepository.update(id, updateBookingDto);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const booking = await this.findById(id);
    if (!booking) return false;

    await this.bookingRepository.delete(id);
    return true;
  }
}
