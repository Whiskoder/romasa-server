import { ResponseEmployeeDto } from 'src/employees/dto';
import { ResponseWorkOrderDto } from './response-work-order.dto';

export class ResponseWorkOrderDiagnosticDto extends ResponseWorkOrderDto {
  reportedByDriver: ResponseEmployeeDto;
  reportedSymptoms: string[];
  impactsOperability: boolean;
  issueFrequency: string;
  technicalDescription?: string[];
  affectedSystems?: string[];
  requiredMaterials?: string[];
}
