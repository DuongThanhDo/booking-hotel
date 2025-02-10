import { DatabaseModule } from './app/database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentityModule } from './app/identity/identity.module';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [DatabaseModule, IdentityModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
