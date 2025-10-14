import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServiceRequestEntity } from './entities';
import { ServiceRequestRelationalRepository } from './repositories';
import { ServiceRequestRepository } from '../service-request.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceRequestEntity])],
  providers: [
    {
      provide: ServiceRequestRepository,
      useClass: ServiceRequestRelationalRepository,
    },
  ],
  exports: [ServiceRequestRepository],
})
export class RelationalServiceRequestPersistenceModule {}
