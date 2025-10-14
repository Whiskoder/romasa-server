import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupEntity } from 'src/groups/infraestructure/persistence/relational/entities';
import { GroupRelationalRepository } from 'src/groups/infraestructure/persistence/relational/repositories';
import { GroupRepository } from '../group.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity])],
  providers: [
    {
      provide: GroupRepository,
      useClass: GroupRelationalRepository,
    },
  ],
  exports: [GroupRepository],
})
export class RelationalGroupPersistenceModule {}
