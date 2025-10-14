import { Module } from '@nestjs/common';

import { RelationalUserPersistenceModule } from 'src/users/infraestructure/persistence/relational/relational-persistence.module';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [RelationalUserPersistenceModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, RelationalUserPersistenceModule],
})
export class UserModule {}
