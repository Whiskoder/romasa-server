import { WorkOrderService } from 'src/work-orders/domain';
import { WorkOrderServiceEntity } from 'src/work-orders/infraestructure/persistence/relational/entities';

export class WorkOrderServiceMapper {
  static toDomain(raw: WorkOrderServiceEntity): WorkOrderService {
    const domainEntity = new WorkOrderService();

    domainEntity.id = raw.id;
    domainEntity.fuelLevelAtReception = raw.fuelLevelAtReception;
    domainEntity.mileageAtReception = raw.mileageAtReception;
    domainEntity.receivedInventoryItems = raw.receivedInventoryItems
      ? raw.receivedInventoryItems.split(',').map((s) => s.trim())
      : undefined;
    domainEntity.roofObservations = raw.roofObservations
      ? raw.roofObservations.split(',').map((s) => s.trim())
      : undefined;
    domainEntity.frontObservations = raw.frontObservations
      ? raw.frontObservations.split(',').map((s) => s.trim())
      : undefined;
    domainEntity.leftSideObservations = raw.leftSideObservations
      ? raw.leftSideObservations.split(',').map((s) => s.trim())
      : undefined;
    domainEntity.rightSideObservations = raw.rightSideObservations
      ? raw.rightSideObservations.split(',').map((s) => s.trim())
      : undefined;
    domainEntity.rearObservations = raw.rearObservations
      ? raw.rearObservations.split(',').map((s) => s.trim())
      : undefined;
    domainEntity.performedServices = raw.performedServices
      ? raw.performedServices.split(',').map((s) => s.trim())
      : undefined;
    domainEntity.installedReplacementParts = raw.installedReplacementParts
      ? raw.installedReplacementParts.split(',').map((s) => s.trim())
      : undefined;
    domainEntity.addedFluids = raw.addedFluids
      ? raw.addedFluids.split(',').map((s) => s.trim())
      : undefined;

    return domainEntity;
  }

  static toPersistence(domain: WorkOrderService): WorkOrderServiceEntity {
    const rawEntity = new WorkOrderServiceEntity();

    rawEntity.id = domain.id;
    rawEntity.fuelLevelAtReception = domain.fuelLevelAtReception;
    rawEntity.mileageAtReception = domain.mileageAtReception;
    rawEntity.receivedInventoryItems = domain.receivedInventoryItems
      ? domain.receivedInventoryItems.join(',')
      : undefined;
    rawEntity.roofObservations = domain.roofObservations
      ? domain.roofObservations.join(',')
      : undefined;
    rawEntity.frontObservations = domain.frontObservations
      ? domain.frontObservations.join(',')
      : undefined;
    rawEntity.leftSideObservations = domain.leftSideObservations
      ? domain.leftSideObservations.join(',')
      : undefined;
    rawEntity.rightSideObservations = domain.rightSideObservations
      ? domain.rightSideObservations.join(',')
      : undefined;
    rawEntity.rearObservations = domain.rearObservations
      ? domain.rearObservations.join(',')
      : undefined;
    rawEntity.performedServices = domain.performedServices
      ? domain.performedServices.join(',')
      : undefined;
    rawEntity.installedReplacementParts = domain.installedReplacementParts
      ? domain.installedReplacementParts.join(',')
      : undefined;
    rawEntity.addedFluids = domain.addedFluids
      ? domain.addedFluids.join(',')
      : undefined;

    return rawEntity;
  }
}
