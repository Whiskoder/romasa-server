import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

import { CryptoModule } from 'src/crypto/crypto.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CryptoModule,
    EmployeesModule,
    NotificationsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
