import { ResponseWorkOrderDto } from './response-work-order.dto';

export class ResponseWorkOrderServiceDto extends ResponseWorkOrderDto {
  fuelLevelAtReception: number;

  mileageAtReception: number;

  receivedInventoryItems: string[];

  visualInspection: {
    roof: string[];
    front: string[];
    leftSide: string[];
    rightSide: string[];
    rear: string[];
  };

  workPerformed?: {
    services: string[];
    replacementParts: string[];
    fluids: string[];
  };
}
