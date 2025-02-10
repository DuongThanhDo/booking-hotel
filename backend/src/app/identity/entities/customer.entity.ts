import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { BookingEntity } from './booking.entity';

@Entity('tbl_customer')
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  customer_id: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  dob: Date;

  @OneToMany(() => BookingEntity, (booking) => booking.customer)
  bookings: BookingEntity[];
}
