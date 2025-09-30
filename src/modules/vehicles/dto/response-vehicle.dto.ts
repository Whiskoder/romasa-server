import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseVehicleDto {
  @Expose()
  id: string;

  @Expose()
  transportNumber?: string;

  @Expose()
  transportSubTypeId?: number;

  @Expose()
  brand?: string;

  @Expose()
  model?: string;

  @Expose()
  manufactureYear?: string;

  @Expose()
  verificationNumber?: string;

  @Expose()
  licensePlate?: string;

  @Expose()
  grossWeight?: number;

  @Expose()
  mileage?: number;

  @Expose()
  operationalStatus?: number;

  @Expose()
  asignedEmployeeId?: number;
}
