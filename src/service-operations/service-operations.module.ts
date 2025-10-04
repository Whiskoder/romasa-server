import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServiceOperation } from 'src/service-operations/entities/service-operation.entity';
import { ServiceOperationDetail } from 'src/service-operations/entities/service-operation-detail.view';
import { ServiceOperationsController } from 'src/service-operations/service-operations.controller';
import { ServiceOperationsMapper } from 'src/service-operations/mappers/service-operations.mapper';
import { ServiceOperationsService } from 'src/service-operations/service-operations.service';

import { EmployeesModule } from 'src/employee/employee.module';
import { VehiclesModule } from 'src/vehicles/vehicles.module';

srcule({
  imports: [
    TypeOrmModule.forFeature([ServiceOperation, ServiceOperationDetail]),
    EmployeesModule,
    VehiclesModule,
  ],
  controllers: [ServiceOperationsController],
  providers: [ServiceOperationsService, ServiceOperationsMapper],
});
export class ServiceOperationsModule {}
