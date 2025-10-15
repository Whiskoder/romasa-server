import { ResponseEmployeeDto } from 'src/employees/dto';

export class ResponseWorkOrderDiagnosticDto {
  id: string;
  reportedByDriver: ResponseEmployeeDto;
  reportedSymptoms: string[];
  impactsOperability: boolean;
  issueFrequency: string;
  technicalDescription?: string[];
  affectedSystems?: string[];
  requiredMaterials?: string[];
}
