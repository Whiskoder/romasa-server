import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseWorkOrderServiceDto {
  @Expose()
  id: string;
  @Expose()
  fuelLevelAtReception: number;
  @Expose()
  mileageAtReception: number;
  @Expose()
  receivedInventoryItems: string[];
  @Expose()
  visualInspection: {
    roof: string[];
    front: string[];
    leftSide: string[];
    rightSide: string[];
    rear: string[];
  };
  @Expose()
  workPerformed?: {
    services: string[];
    replacementParts: string[];
    fluids: string[];
  };
}
