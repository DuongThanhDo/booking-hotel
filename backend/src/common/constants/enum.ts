export enum Role {
  customer = 'customer',
  staff = 'staff',
  admin = 'admin',
}

export enum StatusRoom {
  available = 'có sẵn',
  booked = 'đã đặt',
  maintenance = 'bảo trì',
}

export enum StatusBooking {
  pending = 'đang chờ',
  confirmed = 'đang thuê',
  cancelled = 'đã hủy',
}

export enum StatusPayment {
  pending = 'đang chờ',
  completed = 'đã hoàn thành',
  failed = 'thất bại',
}
