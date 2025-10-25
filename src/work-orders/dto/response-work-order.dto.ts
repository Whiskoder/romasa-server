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

  serviceRequest: ResponseServiceRequestDto;

  workshop: ResponseWorkshopDto;

  scheduling?: {
    scheduledDate?: Date;
    scheduledBy?: ResponseUserDto;
    estimatedDuration?: number; // TODO -> use in minutes
    actualDuration?: number;
    vehicleInWorkshop?: boolean;
  };

  assignment?: {
    supervisor?: ResponseEmployeeDto;
    assignedEmployee?: ResponseEmployeeDto;
  };

  approvalFlow?: {
    requiresApproval: boolean; // TODO -> required: boolean
    approversRequired?: ResponseUserDto[];
    approvedBy?: ResponseUserDto[];
    rejectedBy?: ResponseUserDto[];
    approvalDate?: Date;
  };
}
