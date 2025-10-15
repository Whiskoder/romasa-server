import { ResponseEmployeeDto } from 'src/employees/dto';
import { ServiceRequestSummaryDto } from 'src/service-requests/dtos';
import { UserSummaryDto } from 'src/users/dto';
import { ResponseWorkshopDto } from 'src/workshops/dto';
import { ResponseWorkOrderDiagnosticDto } from './response-diagnostic-work-order.dto';
import { ResponseWorkOrderServiceDto } from './response-service-work-order.dto';
import { VehicleSummaryDto } from 'src/vehicles/dto';

export class ResponseWorkOrderDto {
  id: string;
  status: string;
  requiresApproval: boolean;

  serviceRequest: ServiceRequestSummaryDto;
  vehicle: VehicleSummaryDto;

  workshop: ResponseWorkshopDto;

  scheduling?: {
    scheduledDate?: Date;
    scheduledBy?: UserSummaryDto;
    estimatedDuration?: Date;
    actualDuration?: Date;
    vehicleInWorkshop?: boolean;
  };

  assignment?: {
    supervisor?: ResponseEmployeeDto;
    assignedEmployee?: ResponseEmployeeDto;
  };

  approvalFlow?: {
    approversRequired?: UserSummaryDto[];
    approvedBy?: UserSummaryDto[];
    rejectedBy?: UserSummaryDto[];
    approvalDate?: Date;
  };

  diagnostic?: ResponseWorkOrderDiagnosticDto;

  service?: ResponseWorkOrderServiceDto;
}
