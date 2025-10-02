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
  createdByEmployee: number;

  @Expose()
  estimatedDeliveryDate: Date;

  @Expose()
  departmentManagerEmployee: number;

  @Expose()
  folio: string;

  @Expose()
  priority: string;

  @Expose()
  status: string;

  @Expose()
  updatedAt: number;

  @Expose()
  vehicleDriverEmployee: number;

  @Expose()
  vehicleFailure: string;

  @Expose()
  vehicleFuelLevel: number;

  @Expose()
  vehicle: number;

  @Expose()
  vehicleInventory: string[];

  @Expose()
  vehicleMileage: number;
}
