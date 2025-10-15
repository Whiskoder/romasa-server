import { ResponseEmployeeDto } from 'src/employees/dto';
import { ResponseWorkshopDto } from 'src/workshops/dto';
import { ResponseWorkOrderDiagnosticDto } from './response-work-order-diagnostic.dto';
import { ResponseWorkOrderServiceDto } from './response-work-order-service.dto';
import { ResponseVehicleDto } from 'src/vehicles/dto';
import { ResponseServiceRequestDto } from 'src/service-requests/dtos';
import { ResponseUserDto } from 'src/users/dto';

export class ResponseWorkOrderDto {
  id: string;
  status: string;
  requiresApproval: boolean;

  serviceRequest: ResponseServiceRequestDto;

  workshop: ResponseWorkshopDto;

  scheduling?: {
    scheduledDate?: Date;
    scheduledBy?: ResponseUserDto;
    estimatedDuration?: Date;
    actualDuration?: Date;
    vehicleInWorkshop?: boolean;
  };

  assignment?: {
    supervisor?: ResponseEmployeeDto;
    assignedEmployee?: ResponseEmployeeDto;
  };

  approvalFlow?: {
    approversRequired?: ResponseUserDto[];
    approvedBy?: ResponseUserDto[];
    rejectedBy?: ResponseUserDto[];
    approvalDate?: Date;
  };
}
