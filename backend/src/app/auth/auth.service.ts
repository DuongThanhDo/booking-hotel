import { ExistingUserDto } from '../identity/dtos/existing-user.dto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../identity/dtos/creates';
import { UserEntity } from '../identity/entities';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../identity/services';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(user: CreateUserDto): Promise<UserEntity | any> {
    try {
      const {
        user_name,
        password,
        email,
        role,
        position,
        name,
        phone,
        address,
      } = user;
      const existingUser = await this.userService.findByEmail(email);

      if (existingUser) return 'Email taken!';

      const hashPassword = await this.hashPassword(password);

      const newUser = await this.userService.create({
        user_name,
        email,
        password: hashPassword,
        role,
        dob: undefined,
        position: position || '',
        name: name || '',
        phone: phone || '',
        address: address || '',
      });

      return newUser;
    } catch (error) {
      new Error(error);
    }
  }

  async comparePasswords(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.userService.findByEmail(email);
    const doesUserExist = !!user;

    if (!doesUserExist) return null;

    const doesPasswordMatch = await this.comparePasswords(
      password,
      user.password,
    );

    if (!doesPasswordMatch) return null;

    return user;
  }

  async login(
    existingUserDto: ExistingUserDto,
  ): Promise<{ token: string } | null | UserEntity | any> {
    const { email, password, web } = existingUserDto;
    const user = await this.validateUser(email, password);

    if (
      (web === 'hms' && user.role === 'customer') ||
      (web === 'customer' && user.role !== 'customer')
    )
      return null;

    if (web !== 'hms' && web !== 'customer') return null;

    if (!user) return null;

    const jwt = await this.jwtService.signAsync({ user });
    console.log(jwt);

    return user;
  }
}
