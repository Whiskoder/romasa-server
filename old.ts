// // src/work-orders/infraestructure/persistence/relational/mappers/work-order.mapper.ts
// import { WorkOrder } from 'src/work-orders/domain';
// import { WorkOrderEntity } from '../entities';
// import {
//   WorkOrderResponseDto,
//   EmployeeResponseDto,
//   WorkshopResponseDto,
//   ServiceRequestSummaryDto,
//   VehicleSummaryDto,
//   UserSummaryDto,
// } from 'src/work-orders/dto/responses';

// export class WorkOrderMapper {
//   /**
//    * Maps entity to domain - Only loads what's needed
//    * Use this for business logic operations
//    */
//   static toDomain(entity: WorkOrderEntity): WorkOrder {
//     const domain = new WorkOrder();

//     domain.id = entity.id;
//     domain.status = entity.status;
//     domain.requiresApproval = entity.requiresApproval;
//     domain.scheduledDate = entity.scheduledDate;
//     domain.estimatedDuration = entity.estimatedDuration;
//     domain.actualDuration = entity.actualDuration;
//     domain.vehicleInWorkshop = entity.vehicleInWorkshop;
//     domain.approvalDate = entity.approvalDate;

//     // Only map relations if they're loaded (avoid circular dependencies)
//     if (entity.serviceRequestEntity) {
//       domain.serviceRequest = {
//         id: entity.serviceRequestEntity.id,
//         trackingCode: entity.serviceRequestEntity.trackingCode,
//         priority: entity.serviceRequestEntity.priority as any,
//         createdAt: entity.serviceRequestEntity.createdAt,
//         updatedAt: entity.serviceRequestEntity.updatedAt,
//       } as any; // Simplified mapping
//     }

//     if (entity.workshopEntity) {
//       domain.workshop = {
//         id: entity.workshopEntity.id,
//         name: entity.workshopEntity.name,
//         capacity: entity.workshopEntity.capacity,
//       } as any;
//     }

//     if (entity.scheduledBy) {
//       domain.scheduledBy = {
//         id: entity.scheduledBy.id,
//         email: entity.scheduledBy.email,
//       } as any;
//     }

//     if (entity.supervisor) {
//       domain.supervisor = {
//         id: entity.supervisor.id,
//         employeeNumber: entity.supervisor.employeeNumber,
//         firstName: entity.supervisor.firstName,
//       } as any;
//     }

//     if (entity.assignedEmployeeEntity) {
//       domain.assignedEmployee = {
//         id: entity.assignedEmployeeEntity.id,
//         employeeNumber: entity.assignedEmployeeEntity.employeeNumber,
//         firstName: entity.assignedEmployeeEntity.firstName,
//       } as any;
//     }

//     return domain;
//   }

//   /**
//    * Maps entity to DTO for API responses
//    * This is what you should return from controllers
//    */
//   static toResponseDto(entity: WorkOrderEntity): WorkOrderResponseDto {
//     const dto = new WorkOrderResponseDto();

//     dto.id = entity.id;
//     dto.status = entity.status;
//     dto.requiresApproval = entity.requiresApproval;

//     // Service Request Summary
//     if (entity.serviceRequestEntity) {
//       dto.serviceRequest = {
//         id: entity.serviceRequestEntity.id,
//         trackingCode: entity.serviceRequestEntity.trackingCode,
//         priority: entity.serviceRequestEntity.priority,
//         createdAt: entity.serviceRequestEntity.createdAt,
//       };

//       // Vehicle info from service request
//       if (entity.serviceRequestEntity.vehicleEntity) {
//         dto.vehicle = {
//           id: entity.serviceRequestEntity.vehicleEntity.id,
//           transportNumber:
//             entity.serviceRequestEntity.vehicleEntity.transportNumber,
//           licensePlate: entity.serviceRequestEntity.vehicleEntity.licensePlate,
//           brand: entity.serviceRequestEntity.vehicleEntity.brand,
//           model: entity.serviceRequestEntity.vehicleEntity.model,
//         };
//       }
//     }

//     // Workshop
//     if (entity.workshopEntity) {
//       dto.workshop = {
//         id: entity.workshopEntity.id,
//         name: entity.workshopEntity.name,
//         capacity: entity.workshopEntity.capacity,
//       };
//     }

//     // Scheduling (only if has scheduling data)
//     if (
//       entity.scheduledDate ||
//       entity.scheduledBy ||
//       entity.estimatedDuration
//     ) {
//       dto.scheduling = {
//         scheduledDate: entity.scheduledDate,
//         estimatedDuration: entity.estimatedDuration,
//         actualDuration: entity.actualDuration,
//         vehicleInWorkshop: entity.vehicleInWorkshop,
//       };

//       if (entity.scheduledBy?.employeeEntity) {
//         dto.scheduling.scheduledBy = {
//           id: entity.scheduledBy.id,
//           email: entity.scheduledBy.email,
//           employeeName: this.formatEmployeeName(
//             entity.scheduledBy.employeeEntity,
//           ),
//         };
//       }
//     }

//     // Assignment (only if has assignment data)
//     if (entity.supervisor || entity.assignedEmployeeEntity) {
//       dto.assignment = {};

//       if (entity.supervisor) {
//         dto.assignment.supervisor = this.mapEmployeeToDto(entity.supervisor);
//       }

//       if (entity.assignedEmployeeEntity) {
//         dto.assignment.assignedEmployee = this.mapEmployeeToDto(
//           entity.assignedEmployeeEntity,
//         );
//       }
//     }

//     // Approval Flow (only if requires approval)
//     if (entity.requiresApproval) {
//       dto.approvalFlow = {
//         approvalDate: entity.approvalDate,
//       };

//       if (entity.approversRequired?.length) {
//         dto.approvalFlow.approversRequired = entity.approversRequired.map(
//           (user) => ({
//             id: user.id,
//             email: user.email,
//             employeeName: user.employeeEntity
//               ? this.formatEmployeeName(user.employeeEntity)
//               : 'N/A',
//           }),
//         );
//       }

//       if (entity.approvedBy?.length) {
//         dto.approvalFlow.approvedBy = entity.approvedBy.map((user) => ({
//           id: user.id,
//           email: user.email,
//           employeeName: user.employeeEntity
//             ? this.formatEmployeeName(user.employeeEntity)
//             : 'N/A',
//         }));
//       }

//       if (entity.rejectedBy?.length) {
//         dto.approvalFlow.rejectedBy = entity.rejectedBy.map((user) => ({
//           id: user.id,
//           email: user.email,
//           employeeName: user.employeeEntity
//             ? this.formatEmployeeName(user.employeeEntity)
//             : 'N/A',
//         }));
//       }
//     }

//     return dto;
//   }

//   /**
//    * Maps domain to entity for persistence
//    */
//   static toPersistence(domain: WorkOrder): WorkOrderEntity {
//     const entity = new WorkOrderEntity();

//     entity.id = domain.id;
//     entity.status = domain.status;
//     entity.requiresApproval = domain.requiresApproval;
//     entity.scheduledDate = domain.scheduledDate;
//     entity.estimatedDuration = domain.estimatedDuration;
//     entity.actualDuration = domain.actualDuration;
//     entity.vehicleInWorkshop = domain.vehicleInWorkshop;
//     entity.approvalDate = domain.approvalDate;

//     // Note: Relations should be set separately, not through the mapper
//     // This prevents circular dependencies and keeps concerns separated

//     return entity;
//   }

//   // Helper methods
//   private static mapEmployeeToDto(employee: any): EmployeeResponseDto {
//     return {
//       id: employee.id,
//       employeeNumber: employee.employeeNumber,
//       fullName: this.formatEmployeeName(employee),
//       firstName: employee.firstName,
//       fatherName: employee.fatherName,
//       motherName: employee.motherName,
//     };
//   }

//   private static formatEmployeeName(employee: any): string {
//     const parts = [
//       employee.firstName,
//       employee.fatherName,
//       employee.motherName,
//     ].filter(Boolean);

//     return parts.join(' ');
//   }
// }

// // src/work-orders/infraestructure/persistence/relational/mappers/work-order-diagnostic.mapper.ts
// import { WorkOrderDiagnostic } from 'src/work-orders/domain';
// import { WorkOrderDiagnosticEntity } from '../entities';
// import { WorkOrderDiagnosticResponseDto } from 'src/work-orders/dto/responses';

// export class WorkOrderDiagnosticMapper {
//   static toDomain(entity: WorkOrderDiagnosticEntity): WorkOrderDiagnostic {
//     const domain = new WorkOrderDiagnostic();

//     domain.id = entity.id;
//     domain.reportedSymptoms = this.parseArray(entity.reportedSymptoms);
//     domain.impactsOperability = entity.impactsOperability;
//     domain.issueFrequency = entity.issueFrequency as any;
//     domain.technicalDescription = this.parseArray(entity.technicalDescription);
//     domain.affectedSystems = this.parseArray(entity.affectedSystems) as any;
//     domain.requiredMaterials = this.parseArray(entity.requiredMaterials);

//     // Only set employee reference if loaded
//     if (entity.reportedByDriver) {
//       domain.reportedByDriver = {
//         id: entity.reportedByDriver.id,
//         employeeNumber: entity.reportedByDriver.employeeNumber,
//         firstName: entity.reportedByDriver.firstName,
//       } as any;
//     }

//     return domain;
//   }

//   static toResponseDto(
//     entity: WorkOrderDiagnosticEntity,
//   ): WorkOrderDiagnosticResponseDto {
//     const dto = new WorkOrderDiagnosticResponseDto();

//     dto.id = entity.id;
//     dto.reportedSymptoms = this.parseArray(entity.reportedSymptoms);
//     dto.impactsOperability = entity.impactsOperability;
//     dto.issueFrequency = entity.issueFrequency;
//     dto.technicalDescription = this.parseArray(entity.technicalDescription);
//     dto.affectedSystems = this.parseArray(entity.affectedSystems);
//     dto.requiredMaterials = this.parseArray(entity.requiredMaterials);

//     if (entity.reportedByDriver) {
//       dto.reportedByDriver = {
//         id: entity.reportedByDriver.id,
//         employeeNumber: entity.reportedByDriver.employeeNumber,
//         fullName: this.formatEmployeeName(entity.reportedByDriver),
//         firstName: entity.reportedByDriver.firstName,
//         fatherName: entity.reportedByDriver.fatherName,
//         motherName: entity.reportedByDriver.motherName,
//       };
//     }

//     return dto;
//   }

//   static toPersistence(domain: WorkOrderDiagnostic): WorkOrderDiagnosticEntity {
//     const entity = new WorkOrderDiagnosticEntity();

//     entity.id = domain.id;
//     entity.reportedSymptoms = this.stringifyArray(domain.reportedSymptoms);
//     entity.impactsOperability = domain.impactsOperability;
//     entity.issueFrequency = domain.issueFrequency;
//     entity.technicalDescription = this.stringifyArray(
//       domain.technicalDescription,
//     );
//     entity.affectedSystems = this.stringifyArray(domain.affectedSystems);
//     entity.requiredMaterials = this.stringifyArray(domain.requiredMaterials);

//     return entity;
//   }

//   // Helper methods
//   private static parseArray(value?: string): string[] | undefined {
//     if (!value) return undefined;
//     return value
//       .split(',')
//       .map((item) => item.trim())
//       .filter(Boolean);
//   }

//   private static stringifyArray(value?: string[]): string | undefined {
//     if (!value || value.length === 0) return undefined;
//     return value.join(',');
//   }

//   private static formatEmployeeName(employee: any): string {
//     const parts = [
//       employee.firstName,
//       employee.fatherName,
//       employee.motherName,
//     ].filter(Boolean);

//     return parts.join(' ');
//   }
// }

// // src/work-orders/infraestructure/persistence/relational/mappers/work-order-service.mapper.ts
// import { WorkOrderService } from 'src/work-orders/domain';
// import { WorkOrderServiceEntity } from '../entities';
// import { WorkOrderServiceResponseDto } from 'src/work-orders/dto/responses';

// export class WorkOrderServiceMapper {
//   static toDomain(entity: WorkOrderServiceEntity): WorkOrderService {
//     const domain = new WorkOrderService();

//     domain.id = entity.id;
//     domain.fuelLevelAtReception = entity.fuelLevelAtReception;
//     domain.mileageAtReception = entity.mileageAtReception;
//     domain.receivedInventoryItems =
//       this.parseArray(entity.receivedInventoryItems) || [];
//     domain.roofObservations = this.parseArray(entity.roofObservations) || [];
//     domain.frontObservations = this.parseArray(entity.frontObservations) || [];
//     domain.leftSideObservations =
//       this.parseArray(entity.leftSideObservations) || [];
//     domain.rightSideObservations =
//       this.parseArray(entity.rightSideObservations) || [];
//     domain.rearObservations = this.parseArray(entity.rearObservations) || [];
//     domain.performedServices = this.parseArray(entity.performedServices);
//     domain.installedReplacementParts = this.parseArray(
//       entity.installedReplacementParts,
//     );
//     domain.addedFluids = this.parseArray(entity.addedFluids);

//     return domain;
//   }

//   static toResponseDto(
//     entity: WorkOrderServiceEntity,
//   ): WorkOrderServiceResponseDto {
//     const dto = new WorkOrderServiceResponseDto();

//     dto.id = entity.id;
//     dto.fuelLevelAtReception = entity.fuelLevelAtReception;
//     dto.mileageAtReception = entity.mileageAtReception;
//     dto.receivedInventoryItems =
//       this.parseArray(entity.receivedInventoryItems) || [];

//     // Group visual inspection
//     dto.visualInspection = {
//       roof: this.parseArray(entity.roofObservations) || [],
//       front: this.parseArray(entity.frontObservations) || [],
//       leftSide: this.parseArray(entity.leftSideObservations) || [],
//       rightSide: this.parseArray(entity.rightSideObservations) || [],
//       rear: this.parseArray(entity.rearObservations) || [],
//     };

//     // Group work performed (only if exists)
//     const services = this.parseArray(entity.performedServices);
//     const parts = this.parseArray(entity.installedReplacementParts);
//     const fluids = this.parseArray(entity.addedFluids);

//     if (services || parts || fluids) {
//       dto.workPerformed = {
//         services: services || [],
//         replacementParts: parts || [],
//         fluids: fluids || [],
//       };
//     }

//     return dto;
//   }

//   static toPersistence(domain: WorkOrderService): WorkOrderServiceEntity {
//     const entity = new WorkOrderServiceEntity();

//     entity.id = domain.id;
//     entity.fuelLevelAtReception = domain.fuelLevelAtReception;
//     entity.mileageAtReception = domain.mileageAtReception;
//     entity.receivedInventoryItems = this.stringifyArray(
//       domain.receivedInventoryItems,
//     );
//     entity.roofObservations = this.stringifyArray(domain.roofObservations);
//     entity.frontObservations = this.stringifyArray(domain.frontObservations);
//     entity.leftSideObservations = this.stringifyArray(
//       domain.leftSideObservations,
//     );
//     entity.rightSideObservations = this.stringifyArray(
//       domain.rightSideObservations,
//     );
//     entity.rearObservations = this.stringifyArray(domain.rearObservations);
//     entity.performedServices = this.stringifyArray(domain.performedServices);
//     entity.installedReplacementParts = this.stringifyArray(
//       domain.installedReplacementParts,
//     );
//     entity.addedFluids = this.stringifyArray(domain.addedFluids);

//     return entity;
//   }

//   // Helper methods
//   private static parseArray(value?: string): string[] | undefined {
//     if (!value) return undefined;
//     return value
//       .split(',')
//       .map((item) => item.trim())
//       .filter(Boolean);
//   }

//   private static stringifyArray(value?: string[]): string {
//     if (!value || value.length === 0) return '';
//     return value.join(',');
//   }
// }
// // src/work-orders/dto/responses/work-order-response.dto.ts
// export class EmployeeResponseDto {
//   id: number;
//   employeeNumber: number;
//   fullName: string;
//   firstName: string;
//   fatherName: string;
//   motherName: string;
// }

// export class WorkshopResponseDto {
//   id: string;
//   name: string;
//   capacity: number;
// }

// export class ServiceRequestSummaryDto {
//   id: string;
//   trackingCode: string;
//   priority: string;
//   createdAt: Date;
// }

// export class VehicleSummaryDto {
//   id: number;
//   transportNumber?: string;
//   licensePlate?: string;
//   brand?: string;
//   model?: string;
// }

// export class UserSummaryDto {
//   id: string;
//   email: string;
//   employeeName: string;
// }

// export class WorkOrderDiagnosticResponseDto {
//   id: string;
//   reportedByDriver: EmployeeResponseDto;
//   reportedSymptoms: string[];
//   impactsOperability: boolean;
//   issueFrequency: string;
//   technicalDescription?: string[];
//   affectedSystems?: string[];
//   requiredMaterials?: string[];
// }

// export class WorkOrderServiceResponseDto {
//   id: string;
//   fuelLevelAtReception: number;
//   mileageAtReception: number;
//   receivedInventoryItems: string[];
//   visualInspection: {
//     roof: string[];
//     front: string[];
//     leftSide: string[];
//     rightSide: string[];
//     rear: string[];
//   };
//   workPerformed?: {
//     services: string[];
//     replacementParts: string[];
//     fluids: string[];
//   };
// }

// export class WorkOrderResponseDto {
//   id: string;
//   status: string;
//   requiresApproval: boolean;

//   // Service Request Info
//   serviceRequest: ServiceRequestSummaryDto;
//   vehicle: VehicleSummaryDto;

//   // Workshop Info
//   workshop: WorkshopResponseDto;

//   // Scheduling
//   scheduling?: {
//     scheduledDate?: Date;
//     scheduledBy?: UserSummaryDto;
//     estimatedDuration?: Date;
//     actualDuration?: Date;
//     vehicleInWorkshop?: boolean;
//   };

//   // Assignment
//   assignment?: {
//     supervisor?: EmployeeResponseDto;
//     assignedEmployee?: EmployeeResponseDto;
//   };

//   // Approval Flow
//   approvalFlow?: {
//     approversRequired?: UserSummaryDto[];
//     approvedBy?: UserSummaryDto[];
//     rejectedBy?: UserSummaryDto[];
//     approvalDate?: Date;
//   };

//   // Diagnostic (if exists)
//   diagnostic?: WorkOrderDiagnosticResponseDto;

//   // Service (if exists)
//   service?: WorkOrderServiceResponseDto;
// }

// // src/work-orders/dto/responses/index.ts
// export * from './work-order-response.dto';
