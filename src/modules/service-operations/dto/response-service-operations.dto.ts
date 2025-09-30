import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseServiceOperationsDto {
  @Expose()
  id: number;

  @Expose()
  affectsOperability: boolean;

  @Expose()
  branch: string;

  @Expose()
  createdAt: number;

  @Expose()
  createdByEmployeeId: number;

  @Expose()
  estimatedDeliveryDate: Date;

  @Expose()
  departmentManagerEmployeeId: number;

  @Expose()
  folio: string;

  @Expose()
  priority: string;

  @Expose()
  status: string;

  @Expose()
  updatedAt: number;

  @Expose()
  vehicleDriverEmployeeId: number;

  @Expose()
  vehicleFailure: string;

  @Expose()
  vehicleFuelLevel: number;

  @Expose()
  vehicleId: number;

  @Expose()
  vehicleInventory: string;

  @Expose()
  vehicleMileage: number;
}
