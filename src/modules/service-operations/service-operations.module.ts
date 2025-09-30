import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServiceOperations } from '@mod/service-operations/entities/service-operations.entity';
import { ServiceOperationsController } from '@mod/service-operations/service-operations.controller';
import { ServiceOperationsMapper } from '@mod/service-operations/mappers/service-operations.mapper';
import { ServiceOperationsService } from '@mod/service-operations/service-operations.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceOperations])],
  controllers: [ServiceOperationsController],
  providers: [ServiceOperationsService, ServiceOperationsMapper],
})
export class ServiceOperationsModule {}
