import { Exclude, Expose } from 'class-transformer';

import { OrderStatus } from 'src/work-orders/enums';
import { ResponseUserDto } from 'src/users/dto';
import { ResponseServiceRequestDto } from 'src/service-requests/dtos';
import { ResponseWorkshopDto } from 'src/workshops/dto';
import { ResponseEmployeeDto } from 'src/employees/dto';

@Exclude()
export class ResponseWorkOrderDto {
  @Expose()
  id: string;

  @Expose()
  serviceRequest: ResponseServiceRequestDto;

  @Expose()
  workshop: ResponseWorkshopDto;

  @Expose()
  scheduledDate: Date;

  @Expose()
  scheduledBy: ResponseUserDto;

  @Expose()
  estimatedDuration: Date;

  @Expose()
  actualDuration: Date;

  @Expose()
  supervisor: ResponseEmployeeDto;

  @Expose()
  assignedEmployee: ResponseEmployeeDto;

  @Expose()
  vehicleInWorkshop: boolean;

  @Expose()
  requiresApproval: boolean;

  @Expose()
  approversRequired: ResponseUserDto[];

  @Expose()
  approvedBy: ResponseUserDto[];

  @Expose()
  rejectedBy: ResponseUserDto[];

  @Expose()
  approvalDate: Date;

  @Expose()
  status: OrderStatus;
}
