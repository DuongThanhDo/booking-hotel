import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStratery } from './guards/jwt.strategy';
import { JwtGuard } from './guards/jwt.guard';
import { IdentityModule } from '../identity/identity.module';

@Module({
  imports: [
    forwardRef(() => IdentityModule),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'secret',
        signOptions: { expiresIn: '3600s' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStratery],
  exports: [AuthService],
})
export class AuthModule {}
