import { IntersectionType } from '@nestjs/mapped-types';
import { Exclude, Expose } from 'class-transformer';

import { ResponseWorkOrderDto } from 'src/work-orders/dto';

@Exclude()
export class ResponseDiagnosticWorkOrderDto extends IntersectionType(
  ResponseWorkOrderDto,
) {
  @Expose()
  diagnosticWorkOrderId: string;

  @Expose()
  reportedByDriver: string;

  @Expose()
  reportedSymptoms: string[];

  @Expose()
  impactsOperability: boolean;

  @Expose()
  issueFrequency: string;

  @Expose()
  technicalDescription: string[];

  @Expose()
  affectedSystems: string[];

  @Expose()
  requiredMaterials: string[];
}
