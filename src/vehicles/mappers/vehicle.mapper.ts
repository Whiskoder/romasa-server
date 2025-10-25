import { plainToInstance } from 'class-transformer';

import { ResponseVehicleDto } from 'src/vehicles/dto';
import { Vehicle } from 'src/vehicles/entities';

export class VehicleMapper {
  static toResponseDto(entity: Vehicle): ResponseVehicleDto {
    const dto = plainToInstance(ResponseVehicleDto, {
      id: entity.id,
      basicInformation: {
        transportNumber: entity.transportNumber,
        brand: entity.brand,
        model: entity.model,
        manufactureYear: entity.manufactureYear,
        verificationNumber: entity.verificationNumber,
        licensePlate: entity.licensePlate,
      },
      classification: {
        transportTypeCode: entity.transportTypeCode,
        transportSubTypeId: entity.transportSubTypeId,
        vehicleConfigCode: entity.vehicleConfigCode,
        transportCode: entity.transportCode,
      },
      technical: {
        grossWeight: entity.grossWeight,
        mileage: entity.mileage,
        operationalStatus: entity.operationalStatus,
        lastMaintenanceDate: entity.lastMaintenanceDate,
      },
      assignment: {
        entityId: entity.entityId,
        assignedEmployeeId: entity.assignedEmployeeId,
        assignmentType: entity.assignmentType,
      },
      acquisition: {
        acquisitionDate: entity.acquisitionDate,
        acquisitionAmount: entity.acquisitionAmount,
        acquisitionMethod: entity.acquisitionMethod,
        usefulLife: entity.usefulLife,
      },
      permits: {
        sctPermitType: entity.sctPermitType,
        sctPermitNumber: entity.sctPermitNumber,
      },
      insurance: {
        risk: {
          insurer: entity.riskInsurer,
          policyNumber: entity.riskPolicyNumber,
        },
        environmental: {
          insurer: entity.environmentalInsurer,
          policyNumber: entity.environmentalPolicyNumber,
        },
        cargo: {
          insurer: entity.cargoInsurer,
          policyNumber: entity.cargoPolicyNumber,
        },
      },
    });
    return dto;
  }

  static toResponseDtoList(entities: Vehicle[]): ResponseVehicleDto[] {
    return entities.map((vehicle) => VehicleMapper.toResponseDto(vehicle));
  }
}
