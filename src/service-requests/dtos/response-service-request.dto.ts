import { Exclude, Expose } from 'class-transformer';
import { ResponseUserDto } from 'src/users/dto';
import { ServiceRequestPriority } from 'src/service-requests/enums';
import { ResponseCustomerDto } from 'src/customers/dto';
import { ResponseVehicleDto } from 'src/vehicles/dto';

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
  createdBy: ResponseUserDto;

  @Expose()
  updatedBy: ResponseUserDto;

  @Expose()
  requester: ResponseCustomerDto;

  @Expose()
  vehicle: ResponseVehicleDto;
}
