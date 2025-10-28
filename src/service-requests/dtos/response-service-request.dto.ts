import { ResponseUserDto } from 'src/users/dto';
import {
  ServiceRequestPriority,
  ServiceRequestStatus,
} from 'src/service-requests/enums';
import { ResponseCustomerDto } from 'src/customers/dto';
import { ResponseVehicleDto } from 'src/vehicles/dto';
import {
  ResponseWorkOrderDiagnosticDto,
  ResponseWorkOrderDto,
  ResponseWorkOrderServiceDto,
} from 'src/work-orders/dto';

export class ResponseServiceRequestDto {
  id: string;
  trackingCode: string;
  priority: ServiceRequestPriority;
  createdAt: Date;
  updatedAt: Date;
  status: ServiceRequestStatus;

  createdBy?: ResponseUserDto | null;

  updatedBy?: ResponseUserDto | null;

  requester?: ResponseCustomerDto | null;

  vehicle?: ResponseVehicleDto | null;

  diagnostic?: ResponseWorkOrderDiagnosticDto | null;

  service?: ResponseWorkOrderServiceDto | null;
}
