import { IsEnum, IsInt, IsPositive, IsUUID } from 'class-validator';

import { ServiceRequestPriority } from 'src/service-requests/enums';

export class CreateServiceRequestDto {
  @IsInt()
  @IsPositive()
  vehicleId: number;

  @IsUUID('7')
  customerId: string;

  @IsEnum(ServiceRequestPriority)
  priority: ServiceRequestPriority;
}
//* affectsOperability: [false],
//* branch: [null, Validators.required],
// createdByEmployee: [null, Validators.required],
// departmentManagerEmployee: [null, Validators.required],
//* priority: [null, Validators.required],
//* vehicle: [null, Validators.required],
//* vehicleDriverEmployee: [null, Validators.required],
//* vehicleFailure: ['', Validators.required],
// vehicleFuelLevel: [0, [Validators.min(0), Validators.max(100)]],
// vehicleInventory: [''],
// vehicleMileage: [0, [Validators.min(0), Validators.max(this.MAX_MILEAGE)]],
