import { Module } from '@nestjs/common';

import { RelationalWorkshopPersistenceModule } from 'src/workshops/infraestructure/persistence/relational/relational-persistence.module';
import { WorkshopsController } from 'src/workshops/workshops.controller';
import { WorkshopsService } from 'src/workshops/workshops.service';

@Module({
  imports: [RelationalWorkshopPersistenceModule],
  controllers: [WorkshopsController],
  providers: [WorkshopsService],
  exports: [WorkshopsService, RelationalWorkshopPersistenceModule],
})
export class WorkshopModule {}
