import { Exclude, Expose } from 'class-transformer';
import { ResponseUserDto } from 'src/users/dto';
import { ServiceRequestPriority } from 'src/service-requests/enums';
import { ResponseCustomerDto } from 'src/customers/dto';
import { ResponseVehicleDto } from 'src/vehicles/dto';
import {
  ResponseWorkOrderDiagnosticDto,
  ResponseWorkOrderDto,
  ResponseWorkOrderServiceDto,
} from 'src/work-orders/dto';

@Exclude()
export class ResponseServiceRequestDto {
  @Expose()
  id: string;

  @Expose()
  trackingCode: string;

  @Expose()
  priority: ServiceRequestPriority;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  createdBy?: ResponseUserDto | null;

  @Expose()
  updatedBy?: ResponseUserDto | null;

  @Expose()
  requester?: ResponseCustomerDto | null;

  @Expose()
  vehicle?: ResponseVehicleDto | null;

  @Expose()
  diagnostic?: ResponseWorkOrderDiagnosticDto | null;

  @Expose()
  service?: ResponseWorkOrderServiceDto | null;
}
