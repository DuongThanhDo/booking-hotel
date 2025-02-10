import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BookingEntity,
  CustomerEntity,
  PaymentEntity,
  ProfileEntity,
  RoomEntity,
  StaffEntity,
  UserEntity,
} from './entities';
import { AuthModule } from '../auth/auth.module';
import {
  BookingController,
  CustomerController,
  PaymentController,
  ProfileController,
  RoomController,
  StaffController,
  UserController,
} from './http';
import {
  BookingService,
  CustomerService,
  PaymentService,
  ProfileService,
  RoomService,
  StaffService,
  UserService,
} from './services';
import { AuthMiddle } from './http/middlewares/auth.middle';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerEntity,
      UserEntity,
      StaffEntity,
      RoomEntity,
      BookingEntity,
      PaymentEntity,
      ProfileEntity,
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [
    UserController,
    CustomerController,
    StaffController,
    ProfileController,
    RoomController,
    BookingController,
    PaymentController,
  ],
  providers: [
    UserService,
    CustomerService,
    ProfileService,
    StaffService,
    RoomService,
    BookingService,
    PaymentService,
  ],
  exports: [UserService],
})
export class IdentityModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddle)
      .forRoutes({ path: 'users', method: RequestMethod.GET });
  }
}
