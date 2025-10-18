import { Exclude, Expose } from 'class-transformer';
import { ResponseWorkOrderDto } from './response-work-order.dto';

@Exclude()
export class ResponseWorkOrderServiceDto extends ResponseWorkOrderDto {
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
