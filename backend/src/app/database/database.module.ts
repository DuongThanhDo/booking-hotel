import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'hotel-hub',
      entities: [__dirname + '../../**/*.entity{.ts,.js}'],
      logging: true,
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
