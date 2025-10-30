import { ResponseEmployeeDriverDto } from 'src/employees/dto';
import { ResponseWorkOrderDto } from 'src/work-orders/dto';

export class ResponseWorkOrderDiagnosticDto extends ResponseWorkOrderDto {
  reportedByDriver: ResponseEmployeeDriverDto;
  reportedSymptoms: string[];
  impactsOperability: boolean;
  issueFrequency: string;
  technicalDescription?: string[];
  affectedSystems?: string[];
  requiredMaterials?: string[];
}
