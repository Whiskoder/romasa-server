import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// import { UsersModule } from 'src/users/user.module';
import { CookieService, TokenService } from 'src/auth/services';
import { AuthService } from 'src/auth/auth.service';
import {
  AccessTokenStrategy,
  RefreshTokenStrategy,
  RegisterTokenStrategy,
} from 'src/auth/strategies';
import { AuthController } from 'src/auth/auth.controller';
import { CryptoModule } from 'src/crypto/crypto.module';
import { UsersModule } from 'src/users/users.module';
import { GroupsModule } from 'src/groups/groups.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OneTimeToken } from './entities/one-time-token.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OneTimeToken]),
    JwtModule.register({}),
    CryptoModule,
    UsersModule,
    PassportModule,
    GroupsModule,
    EmployeesModule,
    NotificationsModule,
  ],
  providers: [
    AuthService,
    TokenService,
    CookieService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    RegisterTokenStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
