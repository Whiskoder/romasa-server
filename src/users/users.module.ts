import { Module } from '@nestjs/common';

import { CryptoModule } from 'src/crypto/crypto.module';
import { EmployeesModule } from 'src/employees/employees.module';

import { RelationalUserPersistenceModule } from 'src/users/infraestructure/persistence/relational/relational-persistence.module';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [RelationalUserPersistenceModule, CryptoModule, EmployeesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, RelationalUserPersistenceModule],
})
export class UsersModule {}
