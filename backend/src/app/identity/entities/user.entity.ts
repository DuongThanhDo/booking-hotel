import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { Role } from 'src/common/constants/enum';
import { ProfileEntity } from './profile.entity';
import { StaffEntity } from './staff.entity';

@Entity('tbl_user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  user_name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: Role, default: Role.customer })
  role: Role;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  update_at: Date;

  @OneToOne(() => CustomerEntity, (customer) => customer.user)
  customer: CustomerEntity;

  @OneToOne(() => StaffEntity, (staff) => staff.user)
  staff: StaffEntity;

  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  profile: ProfileEntity;
}
