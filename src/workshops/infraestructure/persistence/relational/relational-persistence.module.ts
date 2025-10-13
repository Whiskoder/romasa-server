import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkshopEntity } from 'src/workshops/infraestructure/persistence/relational/entities';
import { WorkshopRelationalRepository } from 'src/workshops/infraestructure/persistence/relational/repositories';
import { WorkshopRepository } from 'src/workshops/infraestructure/persistence/workshop.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WorkshopEntity])],
  providers: [
    {
      provide: WorkshopRepository,
      useClass: WorkshopRelationalRepository,
    },
  ],
  exports: [WorkshopRepository],
})
export class RelationalWorkshopPersistenceModule {}
