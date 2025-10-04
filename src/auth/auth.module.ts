import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/users/user.module';
import { AuthService } from 'src/auth/auth.service';
import {
  AccessTokenStrategy,
  RefreshTokenStrategy,
  OneTimeTokenStrategy,
} from 'src/auth/strategies';
import { AuthController } from 'src/auth/auth.controller';
import { CryptoModule } from 'src/crypto/crypto.module';

@Module({
  imports: [JwtModule.register({}), CryptoModule, PassportModule, UsersModule],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    OneTimeTokenStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
