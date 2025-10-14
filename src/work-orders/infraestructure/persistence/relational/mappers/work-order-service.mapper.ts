import { WorkOrderService } from 'src/work-orders/domain';
import { WorkOrderServiceEntity } from 'src/work-orders/infraestructure/persistence/relational/entities';
import { WorkOrderMapper } from './work-order.mapper';

export class WorkOrderServiceMapper {
  static toDomain(raw: WorkOrderServiceEntity): WorkOrderService {
    const domainEntity = new WorkOrderService();
    
    domainEntity.id = raw.id;
    domainEntity.workOrder = WorkOrderMapper.toDomain(raw.workOrderEntity);
    domainEntity.fuelLevelAtReception = raw.fuelLevelAtReception;
    domainEntity.mileageAtReception = raw.mileageAtReception;
    domainEntity.receivedInventoryItems = raw.receivedInventoryItems ? raw.receivedInventoryItems.split(',') : [];
    domainEntity.roofObservations = raw.roofObservations ? raw.roofObservations.split(',') : [];
    domainEntity.frontObservations = raw.frontObservations ? raw.frontObservations.split(',') : [];
    domainEntity.leftSideObservations = raw.leftSideObservations ? raw.leftSideObservations.split(',') : [];
    domainEntity.rightSideObservations = raw.rightSideObservations ? raw.rightSideObservations.split(',') : [];
    domainEntity.rearObservations = raw.rearObservations ? raw.rearObservations.split(',') : [];
    domainEntity.performedServices = raw.performedServices ? raw.performedServices.split(',') : undefined;
    domainEntity.installedReplacementParts = raw.installedReplacementParts ? raw.installedReplacementParts.split(',') : undefined;
    domainEntity.addedFluids = raw.addedFluids ? raw.addedFluids.split(',') : undefined;
    
    return domainEntity;
  }

  static toPersistence(domain: WorkOrderService): WorkOrderServiceEntity {
    const rawEntity = new WorkOrderServiceEntity();
    
    rawEntity.id = domain.id;
    rawEntity.workOrderEntity = WorkOrderMapper.toPersistence(domain.workOrder);
    rawEntity.fuelLevelAtReception = domain.fuelLevelAtReception;
    rawEntity.mileageAtReception = domain.mileageAtReception;
    rawEntity.receivedInventoryItems = domain.receivedInventoryItems.join(',');
    rawEntity.roofObservations = domain.roofObservations.join(',');
    rawEntity.frontObservations = domain.frontObservations.join(',');
    rawEntity.leftSideObservations = domain.leftSideObservations.join(',');
    rawEntity.rightSideObservations = domain.rightSideObservations.join(',');
    rawEntity.rearObservations = domain.rearObservations.join(',');
    rawEntity.performedServices = domain.performedServices ? domain.performedServices.join(',') : undefined;
    rawEntity.installedReplacementParts = domain.installedReplacementParts ? domain.installedReplacementParts.join(',') : undefined;
    rawEntity.addedFluids = domain.addedFluids ? domain.addedFluids.join(',') : undefined;
    
    return rawEntity;
  }
}
