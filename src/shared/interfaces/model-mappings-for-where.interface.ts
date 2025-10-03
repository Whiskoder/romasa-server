export interface ModelMappingsForWhere {
  employee: {
    id: string;
    employeeNumber: number;
    mobile: string;
    rfc: string;
    fullName: string;
  };
  serviceOperation: {
    status: string;
  };
  service_operation_details: {
    vehicleLicensePlate: string;
  };
  vehicle: {
    licensePlate: string;
  };
}
