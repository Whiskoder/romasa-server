import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CryptoModule } from 'src/crypto/crypto.module';
import { User } from 'src/users/entities/user.entity';
import { UserMapper } from 'src/users/mappers/user.mapper';
import { RefreshToken } from './entities/refresh-token.entity';
import { OneTimeToken } from './entities/one-time-token.entity';
import { UserService } from './user.service';

srcule({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([User, RefreshToken, OneTimeToken]),
    CryptoModule,
  ],
  providers: [UserService, UserMapper],
  exports: [UserService, UserMapper],
});
export class UsersModule {}
