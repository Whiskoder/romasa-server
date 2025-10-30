import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from 'src/customers/customers.module';

import {
  ServiceRequest,
  ServiceRequestView,
} from 'src/service-requests/entities';
import { ServiceRequestsController } from 'src/service-requests/service-requests.controller';
import { ServiceRequestsService } from 'src/service-requests/service-requests.service';
import { ServiceRequestWorkOrdersController } from 'src/service-requests/work-orders.controller';

import { UsersModule } from 'src/users/users.module';
import { VehiclesModule } from 'src/vehicles/vehicles.module';
import { WorkOrdersModule } from 'src/work-orders/work-orders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceRequest, ServiceRequestView]),
    forwardRef(() => WorkOrdersModule),
    CustomersModule,
    VehiclesModule,
    UsersModule,
  ],
  controllers: [ServiceRequestsController, ServiceRequestWorkOrdersController],
  providers: [ServiceRequestsService],
  exports: [ServiceRequestsService],
})
export class ServiceRequestsModule {}
