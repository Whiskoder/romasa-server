import { IntersectionType } from '@nestjs/mapped-types';
import { Exclude, Expose } from 'class-transformer';
import { ResponseWorkOrderDto } from 'src/work-orders/dto';

@Exclude()
export class ResponseServiceWorkOrderDto extends IntersectionType(
  ResponseWorkOrderDto,
) {
  @Expose()
  serviceWorkOrderId: string;

  @Expose()
  fuelLevelAtReception: number;

  @Expose()
  mileageAtReception: number;

  @Expose()
  receivedInventoryItems: string[];

  @Expose()
  roofObservations: string[];

  @Expose()
  frontObservations: string[];

  @Expose()
  leftSideObservations: string[];

  @Expose()
  rightSideObservations: string[];

  @Expose()
  rearObservations: string[];

  @Expose()
  performedServices: string[];

  @Expose()
  installedReplacementParts: string[];

  @Expose()
  addedFluids: string[];
}
