export class ResponseVehicleDto {
  id: number;
  basicInformation: BasicInformation;
  classification: Classification;
  technical: Technical;
  assignment: Assignment;
  acquisition: Acquisition;
  permits: Permits;
  insurance: Insurance;
}

interface BasicInformation {
  transportNumber: string;
  brand: string;
  model: string;
  manufactureYear: string;
  verificationNumber: string;
  licensePlate: string;
}

interface Classification {
  transportTypeCode: string;
  transportSubTypeId: number;
  vehicleConfigCode: string;
  transportCode: string;
}

interface Technical {
  grossWeight: number;
  mileage: number;
  operationalStatus: number;
  lastMaintenanceDate: Date;
}

interface Assignment {
  entityId: number;
  assignedEmployeeId: number;
  assignmentType: number;
}

interface Acquisition {
  acquisitionDate: Date;
  acquisitionAmount: number;
  acquisitionMethod: string;
  usefulLife: string;
}

interface Permits {
  sctPermitType: string;
  sctPermitNumber: string;
}

interface Insurance {
  risk: InsuranceDetails;
  environmental: InsuranceDetails;
  cargo: InsuranceDetails;
}

interface InsuranceDetails {
  insurer: string;
  policyNumber: string;
}
