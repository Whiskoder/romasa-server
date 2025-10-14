import { Module } from '@nestjs/common';

import { RelationalGroupPersistenceModule } from 'src/groups/infraestructure/persistence/relational/relational-persistence.module';
import { GroupsController } from 'src/groups/groups.controller';
import { GroupsService } from 'src/groups/groups.service';

@Module({
  imports: [RelationalGroupPersistenceModule],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService, RelationalGroupPersistenceModule],
})
export class GroupModule {}
