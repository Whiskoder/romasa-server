import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { IssueFrequency } from 'src/work-orders/enums';

export class CreateWorkOrderDiagnosticDto {
  @IsUUID('7')
  workshopId: string;

  @IsInt()
  @IsPositive()
  reportedByDriverId: number;

  @IsArray()
  @IsString({ each: true })
  reportedSymptoms: string[];

  @IsBoolean()
  impactsOperability: boolean;

  @IsEnum(IssueFrequency)
  issueFrequency: IssueFrequency;
}
