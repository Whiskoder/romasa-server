import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CryptoModule } from 'src/crypto/crypto.module';
import { RefreshToken, OneTimeToken, User } from 'src/users/entities';
import { UserMapper } from 'src/users/mappers/user.mapper';
import { UserService } from 'src/users/user.service';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([User, RefreshToken, OneTimeToken]),
    CryptoModule,
  ],
  providers: [UserService, UserMapper],
  exports: [UserService, UserMapper],
})
export class UsersModule {}
