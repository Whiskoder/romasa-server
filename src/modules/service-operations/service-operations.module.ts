import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServiceOperation } from '@mod/service-operations/entities/service-operation.entity';
import { ServiceOperationDetail } from '@mod/service-operations/entities/service-operation-detail.view';
import { ServiceOperationsController } from '@mod/service-operations/service-operations.controller';
import { ServiceOperationsMapper } from '@mod/service-operations/mappers/service-operations.mapper';
import { ServiceOperationsService } from '@mod/service-operations/service-operations.service';

import { EmployeesModule } from '@mod/employee/employee.module';
import { VehiclesModule } from '@mod/vehicles/vehicles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceOperation, ServiceOperationDetail]),
    EmployeesModule,
    VehiclesModule,
  ],
  controllers: [ServiceOperationsController],
  providers: [ServiceOperationsService, ServiceOperationsMapper],
})
export class ServiceOperationsModule {}
