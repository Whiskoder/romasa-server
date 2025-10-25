import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  WorkOrderDiagnostic,
  WorkOrderService,
} from 'src/work-orders/entities';
import { WorkOrdersController } from 'src/work-orders/work-orders.controller';
import { WorkOrdersService } from 'src/work-orders/work-orders.service';
import { WorkshopsModule } from 'src/workshops/workshops.module';

import { EmployeesModule } from 'src/employees/employees.module';
import { ServiceRequestsModule } from 'src/service-requests/service-requests.module';
// import { UsersModule } from 'src/users/users.module';
import { GroupsModule } from 'src/groups/groups.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([WorkOrderDiagnostic, WorkOrderService]),
    forwardRef(() => ServiceRequestsModule),
    WorkshopsModule,
    EmployeesModule,
    GroupsModule,
  ],
  controllers: [WorkOrdersController],
  providers: [WorkOrdersService],
  exports: [WorkOrdersService],
})
export class WorkOrdersModule {}
