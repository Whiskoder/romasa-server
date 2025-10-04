import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/user.module';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { OneTimeTokenStrategy } from './strategies/one-time-token.strategy';
import { AuthController } from './auth.controller';
import { CryptoModule } from 'src/crypto/crypto.module';

// import { AuthService } from 'src/auth/auth.service';
// import { AuthController } from 'src/auth/auth.controller';

// import { AccessTokenStrategy } from 'src/auth/strategies/access-token.strategy';
// import { RegisterTokenStrategy } from 'src/auth/strategies/register-token.strategy';
// import { RefreshTokenStrategy } from 'src/auth/strategies/refresh-token.strategy';
// import { FormTokenStrategy } from 'src/auth/strategies/form-token.strategy';

// import { CryptoModule } from 'src/crypto/crypto.module';
// import { NotificationsModule } from 'src/notifications/notifications.module';
// import { UsersModule } from 'src/users/users.module';
// import { SchedulesModule } from 'src/schedule/schedules.module';
// import { InvitationTokenModule } from 'src/invitation-token/invitation-token.module';

srcule({
  imports: [
    JwtModule.register({}),
    CryptoModule,
    // NotificationsModule,
    PassportModule,
    UsersModule,
    // SchedulesModule,
    // InvitationTokenModule,
  ],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    OneTimeTokenStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthController],
});
export class AuthModule {}
