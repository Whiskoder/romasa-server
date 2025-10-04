import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@mod/users/user.module';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { OneTimeTokenStrategy } from './strategies/one-time-token.strategy';
import { AuthController } from './auth.controller';
import { CryptoModule } from '@mod/crypto/crypto.module';

// import { AuthService } from '@mod/auth/auth.service';
// import { AuthController } from '@mod/auth/auth.controller';

// import { AccessTokenStrategy } from '@mod/auth/strategies/access-token.strategy';
// import { RegisterTokenStrategy } from '@mod/auth/strategies/register-token.strategy';
// import { RefreshTokenStrategy } from '@mod/auth/strategies/refresh-token.strategy';
// import { FormTokenStrategy } from '@mod/auth/strategies/form-token.strategy';

// import { CryptoModule } from '@mod/crypto/crypto.module';
// import { NotificationsModule } from '@mod/notifications/notifications.module';
// import { UsersModule } from '@mod/users/users.module';
// import { SchedulesModule } from '@mod/schedule/schedules.module';
// import { InvitationTokenModule } from '@mod/invitation-token/invitation-token.module';

@Module({
  imports: [
    JwtModule.register({}),
    CryptoModule,
    // NotificationsModule,
    PassportModule,
    UsersModule
    // SchedulesModule,
    // InvitationTokenModule,
  ],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    OneTimeTokenStrategy
    
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}