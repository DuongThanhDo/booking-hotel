import { UserEntity } from './user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tbl_profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  profile_id: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  address: string;
}
