export class ResponseWorkOrderServiceDto {
  id: string;
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
