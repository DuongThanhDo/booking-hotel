import { Role } from 'src/common/constants/enum';

export class CreateUserDto {
  user_name: string;
  password: string;
  email: string;
  role: Role;

  name: string;
  phone: string;
  address: string;

  dob: Date;
  position: string;
}
