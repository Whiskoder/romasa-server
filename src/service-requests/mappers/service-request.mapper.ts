import { plainToInstance } from 'class-transformer';

import { CustomerMapper } from 'src/customers/mappers';
import { ResponseServiceRequestDto } from 'src/service-requests/dtos';
import { UserMapper } from 'src/users/mappers';
import { VehicleMapper } from 'src/vehicles/mappers';
import {
  ServiceRequest,
  ServiceRequestView,
} from 'src/service-requests/entities';
import { WorkOrderMapper } from 'src/work-orders/mappers';
import { WorkshopMapper } from 'src/workshops/mappers';
import { EmployeeMapper } from 'src/employees/mappers';

export class ServiceRequestMapper {
  static viewToResponseDto(
    entity: ServiceRequestView,
  ): ResponseServiceRequestDto {
    const dto = plainToInstance(ResponseServiceRequestDto, {
      id: entity.id,
      trackingCode: entity.trackingCode,
      priority: entity.priority,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      status: entity.status,
      createdBy: entity.createdBy_id
        ? UserMapper.toResponseDto({
            id: entity.createdBy_id,
            email: entity.createdBy_email,
            employee: {
              employeeNumber: entity.createdByEmployee_employeeNumber,
              firstName: entity.createdByEmployee_firstName,
              fatherName: entity.createdByEmployee_fatherName,
              motherName: entity.createdByEmployee_motherName,
            },
          } as any)
        : undefined,
      updatedBy: entity.updatedBy_id
        ? UserMapper.toResponseDto({
            id: entity.updatedBy_id,
            email: entity.updatedBy_email,
            employee: {
              employeeNumber: entity.updatedByEmployee_employeeNumber,
              firstName: entity.updatedByEmployee_firstName,
              fatherName: entity.updatedByEmployee_fatherName,
              motherName: entity.updatedByEmployee_motherName,
            },
          } as any)
        : undefined,
      requester: entity.requester_id
        ? CustomerMapper.toResponseDto({
            id: entity.requester_id,
            name: entity.requester_name,
          } as any)
        : undefined,
      vehicle: entity.vehicle_id
        ? VehicleMapper.toResponseDto({
            id: entity.vehicle_id,
            transportNumber: entity.vehicle_transportNumber,
            brand: entity.vehicle_brand,
            model: entity.vehicle_model,
            manufactureYear: entity.vehicle_manufactureYear,
            verificationNumber: entity.vehicle_verificationNumber,
            grossWeight: entity.vehicle_grossWeight,
            licensePlate: entity.vehicle_licensePlate,
            mileage: entity.vehicle_mileage,
            operationalStatus: entity.vehicle_operationalStatus,
            lastMaintenanceDate: entity.vehicle_lastMaintenanceDate,
            entityId: entity.vehicle_entityId,
            assignedEmployeeId: entity.vehicle_assignedEmployeeId,
            assignmentType: entity.vehicle_assignmentType,
            acquisitionDate: entity.vehicle_acquisitionDate,
            acquisitionAmount: entity.vehicle_acquisitionAmount,
            acquisitionMethod: entity.vehicle_acquisitionMethod,
            usefulLife: entity.vehicle_usefulLife,
            transportTypeCode: entity.vehicle_transportTypeCode,
            transportSubTypeId: entity.vehicle_transportSubTypeId,
            vehicleConfigCode: entity.vehicle_vehicleConfigCode,
            transportCode: entity.vehicle_transportCode,
            sctPermitType: entity.vehicle_sctPermitType,
            sctPermitNumber: entity.vehicle_sctPermitNumber,
            riskInsurer: entity.vehicle_riskInsurer,
            riskPolicyNumber: entity.vehicle_riskPolicyNumber,
            environmentalInsurer: entity.vehicle_environmentalInsurer,
            environmentalPolicyNumber: entity.vehicle_environmentalPolicyNumber,
            cargoInsurer: entity.vehicle_cargoInsurer,
            cargoPolicyNumber: entity.vehicle_cargoPolicyNumber,
          } as any)
        : undefined,
      diagnostic: entity.diagnostic_id
        ? {
            reportedByDriver: entity.diagnostic_reportedByDriver_id
              ? EmployeeMapper.toResponseDto({
                  id: entity.diagnostic_reportedByDriver_id,
                  employeeNumber:
                    entity.diagnostic_reportedByDriver_employeeNumber,
                  firstName: entity.diagnostic_reportedByDriver_firstName,
                  fatherName: entity.diagnostic_reportedByDriver_fatherName,
                  motherName: entity.diagnostic_reportedByDriver_motherName,
                  licenseNumber:
                    entity.diagnostic_reportedByDriver_licenseNumber,
                  licenseType: entity.diagnostic_reportedByDriver_licenseType,
                  licenseIssueDate:
                    entity.diagnostic_reportedByDriver_licenseIssueDate,
                  licenseExpiryDate:
                    entity.diagnostic_reportedByDriver_licenseExpiryDate,
                } as any)
              : undefined,
            id: entity.diagnostic_id,
            status: entity.diagnostic_status,
            workshop: entity.diagnostic_workshop_id
              ? WorkshopMapper.toResponseDto({
                  id: entity.diagnostic_workshop_id,
                  name: entity.diagnostic_workshop_name,
                  capacity: entity.diagnostic_workshop_capacity,
                } as any)
              : undefined,
            scheduling: {
              scheduledDate: entity.diagnostic_scheduling_scheduledDate,
              scheduledBy: entity.diagnostic_scheduling_scheduledBy_id
                ? UserMapper.toResponseDto({
                    id: entity.diagnostic_scheduling_scheduledBy_id,
                    email: entity.diagnostic_scheduling_scheduledBy_email,
                    employee: {
                      employeeNumber:
                        entity.diagnostic_scheduling_scheduledByEmployee_employeeNumber,
                      firstName:
                        entity.diagnostic_scheduling_scheduledByEmployee_firstName,
                      fatherName:
                        entity.diagnostic_scheduling_scheduledByEmployee_fatherName,
                      motherName:
                        entity.diagnostic_scheduling_scheduledByEmployee_motherName,
                    } as any,
                  } as any)
                : undefined,
              estimatedDuration: entity.diagnostic_scheduling_estimatedDuration,
              actualDuration: entity.diagnostic_scheduling_actualDuration,
              vehicleInWorkshop: entity.diagnostic_scheduling_vehicleInWorkshop,
            },
            assignment: {
              supervisor: entity.diagnostic_assignment_supervisor_id
                ? EmployeeMapper.toResponseDto({
                    id: entity.diagnostic_assignment_supervisor_id,
                    employeeNumber:
                      entity.diagnostic_assignment_supervisor_employeeNumber,
                    firstName:
                      entity.diagnostic_assignment_supervisor_firstName,
                    fatherName:
                      entity.diagnostic_assignment_supervisor_fatherName,
                    motherName:
                      entity.diagnostic_assignment_supervisor_motherName,
                  } as any)
                : undefined,
              assignedEmployee: entity.diagnostic_assignment_assignedEmployee_id
                ? EmployeeMapper.toResponseDto({
                    id: entity.diagnostic_assignment_assignedEmployee_id,
                    employeeNumber:
                      entity.diagnostic_assignment_assignedEmployee_employeeNumber,
                    firstName:
                      entity.diagnostic_assignment_assignedEmployee_firstName,
                    fatherName:
                      entity.diagnostic_assignment_assignedEmployee_fatherName,
                    motherName:
                      entity.diagnostic_assignment_assignedEmployee_motherName,
                  } as any)
                : undefined,
            },
            requiresApproval: entity.diagnostic_approvalFlow_requiresApproval,
            approvalFlow: {
              approvalDate: entity.diagnostic_approvalFlow_approvalDate,
              approversRequired: JSON.parse(
                entity.diagnostic_approvalFlow_approversRequired,
              ).map((obj) => {
                return {
                  id: obj.id,
                  email: obj.email,
                  employee: {
                    employeeNumber: obj.employee_number,
                    firstName: obj.employee_firstName,
                    fatherName: obj.employee_fatherName,
                    motherName: obj.employee_motherName,
                  },
                };
              }),
              approvedBy: JSON.parse(
                entity.diagnostic_approvalFlow_approvedBy,
              ).map((obj) => {
                return {
                  id: obj.id,
                  email: obj.email,
                  employee: {
                    employeeNumber: obj.employee_number,
                    firstName: obj.employee_firstName,
                    fatherName: obj.employee_fatherName,
                    motherName: obj.employee_motherName,
                  },
                };
              }),
              rejectedBy: JSON.parse(
                entity.diagnostic_approvalFlow_rejectedBy,
              ).map((obj) => {
                return {
                  id: obj.id,
                  email: obj.email,
                  employee: {
                    employeeNumber: obj.employee_number,
                    firstName: obj.employee_firstName,
                    fatherName: obj.employee_fatherName,
                    motherName: obj.employee_motherName,
                  },
                };
              }),
            },
            reportedSymptoms: [entity.diagnostic_reportedSymptoms],
            impactsOperability: entity.diagnostic_impactsOperability,
            issueFrequency: entity.diagnostic_issueFrequency,
            technicalDescription: entity.diagnostic_technicalDescription,
            affectedSystems: entity.diagnostic_affectedSystems,
          }
        : undefined,
    });

    return dto;
  }

  static viewToResponseDtoList(
    entities: ServiceRequestView[],
  ): ResponseServiceRequestDto[] {
    return entities.map((serviceRequest) =>
      ServiceRequestMapper.viewToResponseDto(serviceRequest),
    );
  }

  static toResponseDto(entity: ServiceRequest): ResponseServiceRequestDto {
    const dto = plainToInstance(ResponseServiceRequestDto, {
      id: entity.id,
      trackingCode: entity.trackingCode,
      priority: entity.priority,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      createdBy: entity.createdBy
        ? UserMapper.toResponseDto(entity.createdBy)
        : undefined,
      updatedBy: entity.updatedBy
        ? UserMapper.toResponseDto(entity.updatedBy)
        : undefined,
      requester: entity.requester
        ? CustomerMapper.toResponseDto(entity.requester)
        : undefined,
      vehicle: entity.vehicle
        ? VehicleMapper.toResponseDto(entity.vehicle)
        : undefined,
      diagnostic: entity.diagnostic
        ? WorkOrderMapper.diagnosticToResponseDto(entity.diagnostic)
        : undefined,
      service: entity.service
        ? WorkOrderMapper.serviceToResponseDto(entity.service)
        : undefined,
      status: entity.status,
    });

    return dto;
  }

  static toResponseDtoList(
    entities: ServiceRequest[],
  ): ResponseServiceRequestDto[] {
    return entities.map((serviceRequest) =>
      ServiceRequestMapper.toResponseDto(serviceRequest),
    );
  }
}
