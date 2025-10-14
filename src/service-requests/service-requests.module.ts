import { Module } from '@nestjs/common';

import { RelationalServiceRequestPersistenceModule } from 'src/service-requests/infraestructure/persistence/relational/relational-persistence.module';
import { ServiceRequestsController } from 'src/service-requests/service-requests.controller';
import { ServiceRequestsService } from 'src/service-requests/service-requests.service';

@Module({
  imports: [RelationalServiceRequestPersistenceModule],
  controllers: [ServiceRequestsController],
  providers: [ServiceRequestsService],
  exports: [ServiceRequestsService, RelationalServiceRequestPersistenceModule],
})
export class ServiceRequestsModule {}
