import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  ServiceOperationDetail,
  ServiceOperation,
} from 'src/service-operations/entities';
import { ServiceOperationsController } from 'src/service-operations/service-operations.controller';
import { ServiceOperationsMapper } from 'src/service-operations/mappers';
import { ServiceOperationsService } from 'src/service-operations/service-operations.service';

import { EmployeesModule } from 'src/employees/employee.module';
import { VehiclesModule } from 'src/vehicles/vehicle.module';
import { UsersModule } from 'src/users/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceOperation, ServiceOperationDetail]),
    EmployeesModule,
    UsersModule,
    VehiclesModule,
  ],
  controllers: [ServiceOperationsController],
  providers: [ServiceOperationsService, ServiceOperationsMapper],
})
export class ServiceOperationsModule {}
