import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomEntity } from './room.entity';
import { PaymentEntity } from './payment.entity';
import { CustomerEntity } from './customer.entity';
import { StatusBooking } from 'src/common/constants/enum';

@Entity('tbl_booking')
export class BookingEntity {
  @PrimaryGeneratedColumn('uuid')
  booking_id: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.bookings)
  customer: CustomerEntity;

  @OneToMany(() => RoomEntity, (room) => room.booking)
  rooms: RoomEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.booking)
  payments: string[];

  @Column({ type: 'date', default: null })
  check_in: Date;

  @Column({ type: 'date', default: null })
  check_out: Date;

  @Column({ type: 'enum', enum: StatusBooking, default: StatusBooking.pending })
  status: StatusBooking;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
