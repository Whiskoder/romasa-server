import { WorkOrderMapper } from '../mappers/work-order.mapper';
import { WorkOrderDiagnostic, WorkOrderService } from '../domain';
import { ResponseWorkOrderDto } from '../dto';
import { OrderStatus, IssueFrequency, RepairType } from '../enums';
import * as Joi from 'joi';
import { ServiceRequestPriority } from 'src/service-requests/enums';

describe('WorkOrderMapper', () => {
  describe('toResponseDto - Diagnostic', () => {
    it('should map WorkOrderDiagnostic to ResponseWorkOrderDto correctly', () => {
      // Arrange
      const mockDiagnostic: WorkOrderDiagnostic = {
        id: '01234567-89ab-7def-0123-456789abcdef',
        reportedSymptoms: ['Engine noise', 'Smoke from exhaust'],
        impactsOperability: true,
        issueFrequency: IssueFrequency.constant,
        technicalDescription: ['Possible engine failure'],
        affectedSystems: [RepairType.mechanical],
        requiredMaterials: ['Engine oil', 'Oil filter'],
        reportedByDriver: {
          id: 1,
          employeeNumber: 12345,
          fullName: 'John Doe',
          curp: '1234567890',
          firstName: 'John',
          fatherName: 'Doe',
          motherName: 'Jane',
          gender: 'male',
          rfc: 'ABCD123456XXX',
        },
        workOrder: {
          id: '01234567-89ab-7def-0123-456789abcdef',
          status: OrderStatus.pending_approval,
          requiresApproval: true,
          workshop: {
            id: '01234567-89ab-7def-0123-456789abcdef',
            name: 'Main Workshop',
            capacity: 10,
            createdAt: new Date('2025-01-01'),
            updatedAt: new Date('2025-01-01'),
          },
        },
      };

      const responseSchema = Joi.object({
        id: Joi.string().uuid({ version: 'uuidv7' }).required(),
        status: Joi.string()
          .valid(...Object.values(OrderStatus))
          .required(),
        requiresApproval: Joi.boolean().required(),
        serviceRequest: Joi.object().required(),
        workshop: Joi.object({
          id: Joi.string().uuid({ version: 'uuidv7' }).required(),
          name: Joi.string().required(),
          capacity: Joi.number().required(),
          createdAt: Joi.date().required(),
          updatedAt: Joi.date().required(),
        }).required(),
        scheduling: Joi.object({
          scheduledDate: Joi.date().optional(),
          scheduledBy: Joi.object().optional(),
          estimatedDuration: Joi.date().optional(),
          actualDuration: Joi.date().optional(),
          vehicleInWorkshop: Joi.boolean().optional(),
        }).required(),
        assignment: Joi.object({
          supervisor: Joi.object().optional(),
          assignedEmployee: Joi.object().optional(),
        }).required(),
        approvalFlow: Joi.object({
          approversRequired: Joi.array().optional(),
          approvedBy: Joi.array().optional(),
          rejectedBy: Joi.array().optional(),
          approvalDate: Joi.date().optional(),
        }).required(),
        diagnostic: Joi.object({
          id: Joi.string().uuid({ version: 'uuidv7' }).required(),
          reportedByDriver: Joi.object({
            id: Joi.number().required(),
            employeeNumber: Joi.number().required(),
            fullName: Joi.string().required(),
            mobile: Joi.string().required(),
            rfc: Joi.string().required(),
          }).required(),
          reportedSymptoms: Joi.array().items(Joi.string()).required(),
          impactsOperability: Joi.boolean().required(),
          issueFrequency: Joi.string()
            .valid(...Object.values(IssueFrequency))
            .required(),
          technicalDescription: Joi.array().items(Joi.string()).optional(),
          affectedSystems: Joi.array().items(Joi.string()).optional(),
          requiredMaterials: Joi.array().items(Joi.string()).optional(),
        }).optional(),
        service: Joi.object().optional(),
      }).required();

      // Act
      const result: ResponseWorkOrderDto = WorkOrderMapper.toResponseDto(
        mockDiagnostic,
        'diagnostic',
      );

      // Assert
      const { error, value } = responseSchema.validate(result);

      expect(error).toBeUndefined();
      expect(value).toBeDefined();
      expect(result.id).toBe(mockDiagnostic.workOrder.id);
      expect(result.status).toBe(mockDiagnostic.workOrder.status);
      expect(result.requiresApproval).toBe(true);
      expect(result.diagnostic).toBeDefined();
      expect(result.diagnostic?.id).toBe(mockDiagnostic.id);
      expect(result.diagnostic?.reportedSymptoms).toEqual(
        mockDiagnostic.reportedSymptoms,
      );
      expect(result.diagnostic?.impactsOperability).toBe(true);
      expect(result.service).toBeUndefined();
    });

    //   it('should handle optional fields correctly', () => {
    //     // Arrange
    //     const mockDiagnostic: WorkOrderDiagnostic = {
    //       id: '01234567-89ab-7def-0123-456789abcdef',
    //       reportedSymptoms: ['Minor issue'],
    //       impactsOperability: false,
    //       issueFrequency: IssueFrequency.occasional,
    //       reportedByDriver: {
    //         id: 1,
    //         employeeNumber: 12345,
    //         fullName: 'Jane Smith',
    //         mobile: '555-5678',
    //         rfc: 'EFGH789012XXX',
    //       },
    //       workOrder: {
    //         id: '01234567-89ab-7def-0123-456789abcdef',
    //         status: OrderStatus.scheduled,
    //         requiresApproval: false,
    //         serviceRequest: {
    //           id: '01234567-89ab-7def-0123-456789abcdef',
    //           trackingCode: 'SR-002',
    //           priority: 'low',
    //           createdAt: new Date('2025-01-02'),
    //           updatedAt: new Date('2025-01-02'),
    //           createdBy: {
    //             id: '01234567-89ab-7def-0123-456789abcdef',
    //             email: 'user2@example.com',
    //             isActive: true,
    //           },
    //           updatedBy: {
    //             id: '01234567-89ab-7def-0123-456789abcdef',
    //             email: 'user2@example.com',
    //             isActive: true,
    //           },
    //           requester: {
    //             id: '01234567-89ab-7def-0123-456789abcdef',
    //             name: 'Another Customer',
    //             type: 'corporate',
    //             createdAt: new Date('2025-01-02'),
    //             updatedAt: new Date('2025-01-02'),
    //           },
    //           vehicle: {
    //             id: 2,
    //             licensePlate: 'XYZ-789',
    //             vehicleType: 'SUV',
    //             serialNumber: 'VIN987654321',
    //             brand: 'Honda',
    //             model: 'CR-V',
    //             year: 2021,
    //             mileage: 30000,
    //           },
    //         },
    //         workshop: {
    //           id: '01234567-89ab-7def-0123-456789abcdef',
    //           name: 'Secondary Workshop',
    //           capacity: 5,
    //           createdAt: new Date('2025-01-02'),
    //           updatedAt: new Date('2025-01-02'),
    //         },
    //       },
    //     };

    //     // Act
    //     const result = WorkOrderMapper.toResponseDto(
    //       mockDiagnostic,
    //       'diagnostic',
    //     );

    //     // Assert
    //     expect(result.diagnostic?.technicalDescription).toBeUndefined();
    //     expect(result.diagnostic?.affectedSystems).toBeUndefined();
    //     expect(result.diagnostic?.requiredMaterials).toBeUndefined();
    //   });
    // });

    // describe('toResponseDto - Service', () => {
    //   it('should map WorkOrderService to ResponseWorkOrderDto correctly', () => {
    //     // Arrange
    //     const mockService: WorkOrderService = {
    //       id: '01234567-89ab-7def-0123-456789abcdef',
    //       fuelLevelAtReception: 75,
    //       mileageAtReception: 50000,
    //       receivedInventoryItems: ['Jack', 'Spare tire', 'Tools'],
    //       roofObservations: ['Minor scratch'],
    //       frontObservations: ['Clean'],
    //       leftSideObservations: ['Small dent'],
    //       rightSideObservations: ['Clean'],
    //       rearObservations: ['Bumper scratch'],
    //       performedServices: ['Oil change', 'Tire rotation'],
    //       installedReplacementParts: ['Oil filter', 'Air filter'],
    //       addedFluids: ['Engine oil 5W-30 (4L)', 'Coolant (1L)'],
    //       workOrder: {
    //         id: '01234567-89ab-7def-0123-456789abcdef',
    //         status: OrderStatus.completed,
    //         requiresApproval: false,
    //         serviceRequest: {
    //           id: '01234567-89ab-7def-0123-456789abcdef',
    //           trackingCode: 'SR-003',
    //           priority: 'medium',
    //           createdAt: new Date('2025-01-03'),
    //           updatedAt: new Date('2025-01-03'),
    //           createdBy: {
    //             id: '01234567-89ab-7def-0123-456789abcdef',
    //             email: 'user3@example.com',
    //             isActive: true,
    //           },
    //           updatedBy: {
    //             id: '01234567-89ab-7def-0123-456789abcdef',
    //             email: 'user3@example.com',
    //             isActive: true,
    //           },
    //           requester: {
    //             id: '01234567-89ab-7def-0123-456789abcdef',
    //             name: 'Service Customer',
    //             type: 'individual',
    //             createdAt: new Date('2025-01-03'),
    //             updatedAt: new Date('2025-01-03'),
    //           },
    //           vehicle: {
    //             id: 3,
    //             licensePlate: 'DEF-456',
    //             vehicleType: 'Truck',
    //             serialNumber: 'VIN456789123',
    //             brand: 'Ford',
    //             model: 'F-150',
    //             year: 2019,
    //             mileage: 75000,
    //           },
    //         },
    //         workshop: {
    //           id: '01234567-89ab-7def-0123-456789abcdef',
    //           name: 'Service Workshop',
    //           capacity: 8,
    //           createdAt: new Date('2025-01-03'),
    //           updatedAt: new Date('2025-01-03'),
    //         },
    //       },
    //     };

    //     // Define schema
    //     const serviceSchema = Joi.object({
    //       id: Joi.string().uuid({ version: 'uuidv7' }).required(),
    //       fuelLevelAtReception: Joi.number().min(0).max(100).required(),
    //       mileageAtReception: Joi.number().min(0).required(),
    //       receivedInventoryItems: Joi.array().items(Joi.string()).required(),
    //       visualInspection: Joi.object({
    //         roof: Joi.array().items(Joi.string()).required(),
    //         front: Joi.array().items(Joi.string()).required(),
    //         leftSide: Joi.array().items(Joi.string()).required(),
    //         rightSide: Joi.array().items(Joi.string()).required(),
    //         rear: Joi.array().items(Joi.string()).required(),
    //       }).required(),
    //       workPerformed: Joi.object({
    //         services: Joi.array().items(Joi.string()).required(),
    //         replacementParts: Joi.array().items(Joi.string()).required(),
    //         fluids: Joi.array().items(Joi.string()).required(),
    //       }).optional(),
    //     });

    //     // Act
    //     const result = WorkOrderMapper.toResponseDto(mockService, 'service');

    //     // Assert
    //     const { error } = serviceSchema.validate(result.service);
    //     expect(error).toBeUndefined();
    //     expect(result.service).toBeDefined();
    //     expect(result.service?.fuelLevelAtReception).toBe(75);
    //     expect(result.service?.mileageAtReception).toBe(50000);
    //     expect(result.service?.receivedInventoryItems).toHaveLength(3);
    //     expect(result.service?.workPerformed?.services).toHaveLength(2);
    //     expect(result.diagnostic).toBeUndefined();
    //   });
    // });

    // describe('toResponseDtoList', () => {
    //   it('should map array of diagnostics correctly', () => {
    //     // Arrange
    //     const mockDiagnostics: WorkOrderDiagnostic[] = [
    //       {
    //         id: '01234567-89ab-7def-0123-456789abcdef',
    //         reportedSymptoms: ['Issue 1'],
    //         impactsOperability: true,
    //         issueFrequency: IssueFrequency.constant,
    //         reportedByDriver: {
    //           id: 1,
    //           employeeNumber: 12345,
    //           fullName: 'Driver 1',
    //           mobile: '555-0001',
    //           rfc: 'RFC1',
    //         },
    //         workOrder: {
    //           id: '01234567-89ab-7def-0123-456789abcdef',
    //           status: OrderStatus.pending_approval,
    //           requiresApproval: true,
    //           serviceRequest: {} as any,
    //           workshop: {} as any,
    //         },
    //       },
    //       {
    //         id: '01234567-89ab-7def-0123-456789abcde0',
    //         reportedSymptoms: ['Issue 2'],
    //         impactsOperability: false,
    //         issueFrequency: IssueFrequency.occasional,
    //         reportedByDriver: {
    //           id: 2,
    //           employeeNumber: 67890,
    //           fullName: 'Driver 2',
    //           mobile: '555-0002',
    //           rfc: 'RFC2',
    //         },
    //         workOrder: {
    //           id: '01234567-89ab-7def-0123-456789abcde0',
    //           status: OrderStatus.scheduled,
    //           requiresApproval: false,
    //           serviceRequest: {} as any,
    //           workshop: {} as any,
    //         },
    //       },
    //     ];

    //     // Act
    //     const results = WorkOrderMapper.toResponseDtoList(
    //       mockDiagnostics,
    //       'diagnostic',
    //     );

    //     // Assert
    //     expect(results).toHaveLength(2);
    //     expect(results[0].diagnostic?.reportedSymptoms[0]).toBe('Issue 1');
    //     expect(results[1].diagnostic?.reportedSymptoms[0]).toBe('Issue 2');
    //   });
  });
});
