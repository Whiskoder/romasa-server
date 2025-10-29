import { DataSource, Entity, ViewColumn, ViewEntity } from 'typeorm';
import { ServiceRequest } from './service-request.entity';
import { EmployeeDriver } from 'src/employees/entities/employee-driver.entity';

@ViewEntity({
  name: 'service_request_view',
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder(ServiceRequest, 'entity')
      // base entity
      .select('entity.id', 'id')
      .addSelect('entity.trackingCode', 'trackingCode')
      .addSelect('entity.priority', 'priority')
      .addSelect('entity.createdAt', 'createdAt')
      .addSelect('entity.updatedAt', 'updatedAt')
      .addSelect('entity.status', 'status')

      // CreatedBy
      .leftJoin('entity.createdBy', 'createdBy')
      .leftJoin('createdBy.employee', 'createdByEmployee')
      .addSelect('createdBy.id', 'createdBy_id')
      .addSelect('createdBy.email', 'createdBy_email')
      .addSelect(
        'createdByEmployee.employeeNumber',
        'createdByEmployee_employeeNumber',
      )
      .addSelect('createdByEmployee.firstName', 'createdByEmployee_firstName')
      .addSelect('createdByEmployee.fatherName', 'createdByEmployee_fatherName')
      .addSelect('createdByEmployee.motherName', 'createdByEmployee_motherName')

      //UpdatedBy
      .leftJoin('entity.updatedBy', 'updatedBy')
      .leftJoin('updatedBy.employee', 'updatedByEmployee')
      .addSelect('updatedBy.id', 'updatedBy_id')
      .addSelect('updatedBy.email', 'updatedBy_email')
      .addSelect(
        'updatedByEmployee.employeeNumber',
        'updatedByEmployee_employeeNumber',
      )
      .addSelect('updatedByEmployee.firstName', 'updatedByEmployee_firstName')
      .addSelect('updatedByEmployee.fatherName', 'updatedByEmployee_fatherName')
      .addSelect('updatedByEmployee.motherName', 'updatedByEmployee_motherName')

      // Requester
      .leftJoin('entity.requester', 'requester')
      .addSelect('requester.id', 'requester_id')
      .addSelect('requester.name', 'requester_name')

      // Vehicle
      .leftJoin('entity.vehicle', 'vehicle')
      .addSelect('vehicle.id', 'vehicle_id')
      // Vehicle - Basic information
      .addSelect('vehicle.transportNumber', 'vehicle_transportNumber')
      .addSelect('vehicle.brand', 'vehicle_brand')
      .addSelect('vehicle.model', 'vehicle_model')
      .addSelect('vehicle.manufactureYear', 'vehicle_manufactureYear')
      .addSelect('vehicle.verificationNumber', 'vehicle_verificationNumber')
      .addSelect('vehicle.licensePlate', 'vehicle_licensePlate')
      // Vehicle - Clasification
      .addSelect('vehicle.transportTypeCode', 'vehicle_transportTypeCode')
      .addSelect('vehicle.transportSubTypeId', 'vehicle_transportSubTypeId')
      .addSelect('vehicle.vehicleConfigCode', 'vehicle_vehicleConfigCode')
      .addSelect('vehicle.transportCode', 'vehicle_transportCode')
      // Vehicle - Technical
      .addSelect('vehicle.grossWeight', 'vehicle_grossWeight')
      .addSelect('vehicle.mileage', 'vehicle_mileage')
      .addSelect('vehicle.operationalStatus', 'vehicle_operationalStatus')
      .addSelect('vehicle.lastMaintenanceDate', 'vehicle_lastMaintenanceDate')
      // Vehicle - Assignment
      .addSelect('vehicle.entityId', 'vehicle_entityId')
      .addSelect('vehicle.assignedEmployeeId', 'vehicle_assignedEmployeeId')
      .addSelect('vehicle.assignmentType', 'vehicle_assignmentType')
      // Vehicle - Acquisition
      .addSelect('vehicle.acquisitionDate', 'vehicle_acquisitionDate')
      .addSelect('vehicle.acquisitionAmount', 'vehicle_acquisitionAmount')
      .addSelect('vehicle.acquisitionMethod', 'vehicle_acquisitionMethod')
      .addSelect('vehicle.usefulLife', 'vehicle_usefulLife')
      // Vehicle - Permits
      .addSelect('vehicle.sctPermitType', 'vehicle_sctPermitType')
      .addSelect('vehicle.sctPermitNumber', 'vehicle_sctPermitNumber')
      .addSelect('vehicle.riskInsurer', 'vehicle_riskInsurer')
      .addSelect('vehicle.riskPolicyNumber', 'vehicle_riskPolicyNumber')
      .addSelect('vehicle.environmentalInsurer', 'vehicle_environmentalInsurer')
      .addSelect(
        'vehicle.environmentalPolicyNumber',
        'vehicle_environmentalPolicyNumber',
      )
      .addSelect('vehicle.cargoInsurer', 'vehicle_cargoInsurer')
      .addSelect('vehicle.cargoPolicyNumber', 'vehicle_cargoPolicyNumber')

      // Diagnostic base
      .leftJoin('entity.diagnostic', 'diagnostic')
      .leftJoin('diagnostic.reportedByDriver', 'reportedByDriver')
      .leftJoin(
        EmployeeDriver,
        'reportedByDriverLicense',
        'reportedByDriver.id = reportedByDriverLicense.employeeId',
      )
      .leftJoin('diagnostic.supervisor', 'supervisor')
      .leftJoin('diagnostic.assignedEmployee', 'assignedEmployee')
      .leftJoin('diagnostic.scheduledBy', 'scheduledBy')
      .leftJoin('scheduledBy.employee', 'scheduledByEmployee')
      .leftJoin('diagnostic.workshop', 'workshop')
      .addSelect('diagnostic.id', 'diagnostic_id')
      .addSelect('diagnostic.status', 'diagnostic_status')
      // Diagnostic base - Workshop
      .addSelect('workshop.id', 'diagnostic_workshop_id')
      .addSelect('workshop.name', 'diagnostic_workshop_name')
      .addSelect('workshop.capacity', 'diagnostic_workshop_capacity')
      // Diagnostic base - Scheduling
      .addSelect(
        'diagnostic.scheduledDate',
        'diagnostic_scheduling_scheduledDate',
      )
      .addSelect(
        'diagnostic.estimatedDuration',
        'diagnostic_scheduling_estimatedDuration',
      )
      .addSelect(
        'diagnostic.actualDuration',
        'diagnostic_scheduling_actualDuration',
      )
      .addSelect(
        'diagnostic.vehicleInWorkshop',
        'diagnostic_scheduling_vehicleInWorkshop',
      )
      // Diagnostic base - Scheduling - ScheduledBy
      .addSelect('scheduledBy.id', 'diagnostic_scheduling_scheduledBy_id')
      .addSelect('scheduledBy.email', 'diagnostic_scheduling_scheduledBy_email')
      .addSelect(
        'scheduledByEmployee.employeeNumber',
        'diagnostic_scheduling_scheduledByEmployee_employeeNumber',
      )
      .addSelect(
        'scheduledByEmployee.firstName',
        'diagnostic_scheduling_scheduledByEmployee_firstName',
      )
      .addSelect(
        'scheduledByEmployee.fatherName',
        'diagnostic_scheduling_scheduledByEmployee_fatherName',
      )
      .addSelect(
        'scheduledByEmployee.motherName',
        'diagnostic_scheduling_scheduledByEmployee_motherName',
      )
      // Diagnostic base - Assignment
      .addSelect('supervisor.id', 'diagnostic_assignment_supervisor_id')
      .addSelect(
        'supervisor.firstName',
        'diagnostic_assignment_supervisor_firstName',
      )
      .addSelect(
        'supervisor.fatherName',
        'diagnostic_assignment_supervisor_fatherName',
      )
      .addSelect(
        'supervisor.motherName',
        'diagnostic_assignment_supervisor_motherName',
      )
      .addSelect(
        'supervisor.employeeNumber',
        'diagnostic_assignment_supervisor_employeeNumber',
      )
      .addSelect(
        'assignedEmployee.id',
        'diagnostic_assignment_assignedEmployee_id',
      )
      .addSelect(
        'assignedEmployee.employeeNumber',
        'diagnostic_assignment_assignedEmployee_employeeNumber',
      )
      .addSelect(
        'assignedEmployee.firstName',
        'diagnostic_assignment_assignedEmployee_firstName',
      )
      .addSelect(
        'assignedEmployee.fatherName',
        'diagnostic_assignment_assignedEmployee_fatherName',
      )
      .addSelect(
        'assignedEmployee.motherName',
        'diagnostic_assignment_assignedEmployee_motherName',
      )
      // Diagnostic base - Approval Flow
      .addSelect(
        'diagnostic.requiresApproval',
        'diagnostic_approvalFlow_requiresApproval',
      )
      .addSelect(
        'diagnostic.approvalDate',
        'diagnostic_approvalFlow_approvalDate',
      )
      .addSelect(
        `ISNULL((
          SELECT
            u.id             AS [id],
            u.email          AS [email],
            e.LNGNOEMP      AS [employee_number],
            e.STRNOMEMP      AS [employee_firstName],
            e.STRAPMEMP     AS [employee_motherName],
            e.STRAPPEMP     AS [employee_fatherName]
          FROM work_order_diagnostic_approvers_required_user AS j
          JOIN [user] AS u ON u.id = j.userId
          LEFT JOIN TBLCATEMP AS e ON e.LNGCLVEMP = u.employeeId
          WHERE j.workOrderDiagnosticId = diagnostic.id
          ORDER BY u.id
          FOR JSON PATH
        ), '[]')`,
        'diagnostic_approvalFlow_approversRequired',
      )
      .addSelect(
        `ISNULL((
          SELECT
            u.id             AS [id],
            u.email          AS [email],
            e.LNGNOEMP      AS [employee_number],
            e.STRNOMEMP      AS [employee_firstName],
            e.STRAPMEMP     AS [employee_motherName],
            e.STRAPPEMP     AS [employee_fatherName]
          FROM work_order_diagnostic_approved_by_user AS j
          JOIN [user] AS u ON u.id = j.userId
          LEFT JOIN TBLCATEMP AS e ON e.LNGCLVEMP = u.employeeId
          WHERE j.workOrderDiagnosticId = diagnostic.id
          ORDER BY u.id
          FOR JSON PATH
        ), '[]')`,
        'diagnostic_approvalFlow_approvedBy',
      )
      .addSelect(
        `ISNULL((
          SELECT
            u.id             AS [id],
            u.email          AS [email],
            e.LNGNOEMP      AS [employee_number],
            e.STRNOMEMP      AS [employee_firstName],
            e.STRAPMEMP     AS [employee_motherName],
            e.STRAPPEMP     AS [employee_fatherName]
          FROM work_order_diagnostic_rejected_by_user AS j
          JOIN [user] AS u ON u.id = j.userId
          LEFT JOIN TBLCATEMP AS e ON e.LNGCLVEMP = u.employeeId
          WHERE j.workOrderDiagnosticId = diagnostic.id
          ORDER BY u.id
          FOR JSON PATH
        ), '[]')`,
        'diagnostic_approvalFlow_rejectedBy',
      )

      // Diagnostic custom fields
      .addSelect('diagnostic.reportedSymptoms', 'diagnostic_reportedSymptoms')
      .addSelect(
        'diagnostic.impactsOperability',
        'diagnostic_impactsOperability',
      )
      .addSelect('diagnostic.issueFrequency', 'diagnostic_issueFrequency')
      .addSelect(
        'diagnostic.technicalDescription',
        'diagnostic_technicalDescription',
      )
      .addSelect('diagnostic.affectedSystems', 'diagnostic_affectedSystems')
      // Diagnostic custom fields - reportedByDriver
      .addSelect('reportedByDriver.id', 'diagnostic_reportedByDriver_id')
      .addSelect(
        'reportedByDriver.employeeNumber',
        'diagnostic_reportedByDriver_employeeNumber',
      )
      .addSelect(
        'reportedByDriver.firstName',
        'diagnostic_reportedByDriver_firstName',
      )
      .addSelect(
        'reportedByDriver.fatherName',
        'diagnostic_reportedByDriver_fatherName',
      )
      .addSelect(
        'reportedByDriver.motherName',
        'diagnostic_reportedByDriver_motherName',
      )
      .addSelect(
        'reportedByDriverLicense.licenseNumber',
        'diagnostic_reportedByDriver_licenseNumber',
      )
      .addSelect(
        'reportedByDriverLicense.licenseType',
        'diagnostic_reportedByDriver_licenseType',
      )
      .addSelect(
        'reportedByDriverLicense.licenseIssueDate',
        'diagnostic_reportedByDriver_licenseIssueDate',
      )
      .addSelect(
        'reportedByDriverLicense.licenseExpiryDate',
        'diagnostic_reportedByDriver_licenseExpiryDate',
      ),
})
// TODO: depends on https://typeorm.io/docs/entity/view-entities
export class ServiceRequestView {
  @ViewColumn() id: string;
  @ViewColumn() trackingCode: string;
  @ViewColumn() priority: string;
  @ViewColumn() createdAt: Date;
  @ViewColumn() updatedAt: Date;
  @ViewColumn() status: string;

  // CreatedBy
  @ViewColumn() createdBy_id: string;
  @ViewColumn() createdBy_email: string;
  @ViewColumn() createdByEmployee_employeeNumber: number;
  @ViewColumn() createdByEmployee_firstName: string;
  @ViewColumn() createdByEmployee_fatherName: string;
  @ViewColumn() createdByEmployee_motherName: string;

  // UpdatedBy
  @ViewColumn() updatedBy_id: string;
  @ViewColumn() updatedBy_email: string;
  @ViewColumn() updatedByEmployee_employeeNumber: number;
  @ViewColumn() updatedByEmployee_firstName: string;
  @ViewColumn() updatedByEmployee_fatherName: string;
  @ViewColumn() updatedByEmployee_motherName: string;

  // Requester
  @ViewColumn() requester_id: string;
  @ViewColumn() requester_name: string;

  // Vehicle
  @ViewColumn() vehicle_id: string;
  // Vehicle - Basic information
  @ViewColumn() vehicle_transportNumber: string;
  @ViewColumn() vehicle_brand: string;
  @ViewColumn() vehicle_model: string;
  @ViewColumn() vehicle_manufactureYear: string;
  @ViewColumn() vehicle_verificationNumber: string;
  @ViewColumn() vehicle_licensePlate: string;
  // Vehicle - Clasification
  @ViewColumn() vehicle_transportTypeCode: string;
  @ViewColumn() vehicle_transportSubTypeId: number;
  @ViewColumn() vehicle_vehicleConfigCode: string;
  @ViewColumn() vehicle_transportCode: string;
  // Vehicle - Technical
  @ViewColumn() vehicle_grossWeight: number;
  @ViewColumn() vehicle_mileage: number;
  @ViewColumn() vehicle_operationalStatus: number;
  @ViewColumn() vehicle_lastMaintenanceDate: Date;
  // Vehicle - Assignment
  @ViewColumn() vehicle_entityId: number;
  @ViewColumn() vehicle_assignedEmployeeId: number;
  @ViewColumn() vehicle_assignmentType: number;
  // Vehicle - Acquisition
  @ViewColumn() vehicle_acquisitionDate: Date;
  @ViewColumn() vehicle_acquisitionAmount: number;
  @ViewColumn() vehicle_acquisitionMethod: string;
  @ViewColumn() vehicle_usefulLife: string;
  // Vehicle - Permits
  @ViewColumn() vehicle_sctPermitType: string;
  @ViewColumn() vehicle_sctPermitNumber: string;
  @ViewColumn() vehicle_riskInsurer: string;
  @ViewColumn() vehicle_riskPolicyNumber: string;
  @ViewColumn() vehicle_environmentalInsurer: string;
  @ViewColumn() vehicle_environmentalPolicyNumber: string;
  @ViewColumn() vehicle_cargoInsurer: string;
  @ViewColumn() vehicle_cargoPolicyNumber: string;

  // Diagnostic base
  @ViewColumn() diagnostic_id: string;
  @ViewColumn() diagnostic_status: string;
  // Diagnostic base - Workshop
  @ViewColumn() diagnostic_workshop_id: string;
  @ViewColumn() diagnostic_workshop_name: string;
  @ViewColumn() diagnostic_workshop_capacity: number;
  // Diagnostic base - Scheduling
  @ViewColumn() diagnostic_scheduling_scheduledDate: Date;
  @ViewColumn() diagnostic_scheduling_estimatedDuration: number;
  @ViewColumn() diagnostic_scheduling_actualDuration: number;
  @ViewColumn() diagnostic_scheduling_vehicleInWorkshop: boolean;
  // Diagnostic base - Scheduling - ScheduledBy
  @ViewColumn() diagnostic_scheduling_scheduledBy_id: string;
  @ViewColumn() diagnostic_scheduling_scheduledBy_email: string;
  @ViewColumn()
  diagnostic_scheduling_scheduledByEmployee_employeeNumber: number;
  @ViewColumn() diagnostic_scheduling_scheduledByEmployee_firstName: string;
  @ViewColumn() diagnostic_scheduling_scheduledByEmployee_fatherName: string;
  @ViewColumn() diagnostic_scheduling_scheduledByEmployee_motherName: string;
  // Diagnostic base - Assignment
  @ViewColumn() diagnostic_assignment_supervisor_id: string;
  @ViewColumn() diagnostic_assignment_supervisor_employeeNumber: number;
  @ViewColumn() diagnostic_assignment_supervisor_firstName: string;
  @ViewColumn() diagnostic_assignment_supervisor_fatherName: string;
  @ViewColumn() diagnostic_assignment_supervisor_motherName: string;
  @ViewColumn() diagnostic_assignment_assignedEmployee_id: string;
  @ViewColumn() diagnostic_assignment_assignedEmployee_employeeNumber: number;
  @ViewColumn() diagnostic_assignment_assignedEmployee_firstName: string;
  @ViewColumn() diagnostic_assignment_assignedEmployee_fatherName: string;
  @ViewColumn() diagnostic_assignment_assignedEmployee_motherName: string;
  // Diagnostic base - Approval Flow
  @ViewColumn() diagnostic_approvalFlow_requiresApproval: boolean;
  @ViewColumn() diagnostic_approvalFlow_approversRequired: string;
  @ViewColumn() diagnostic_approvalFlow_approvedBy: string;
  @ViewColumn() diagnostic_approvalFlow_rejectedBy: string;
  @ViewColumn() diagnostic_approvalFlow_approvalDate: Date;
  // Diagnostic custom fields
  @ViewColumn() diagnostic_reportedSymptoms: string;
  @ViewColumn() diagnostic_impactsOperability: boolean;
  @ViewColumn() diagnostic_issueFrequency: string;
  @ViewColumn() diagnostic_technicalDescription: string;
  @ViewColumn() diagnostic_affectedSystems: string;
  // Diagnostic custom fields - ReportedByDriver
  @ViewColumn() diagnostic_reportedByDriver_id: string;
  @ViewColumn() diagnostic_reportedByDriver_employeeNumber: number;
  @ViewColumn() diagnostic_reportedByDriver_firstName: string;
  @ViewColumn() diagnostic_reportedByDriver_fatherName: string;
  @ViewColumn() diagnostic_reportedByDriver_motherName: string;
  @ViewColumn() diagnostic_reportedByDriver_licenseNumber: string;
  @ViewColumn() diagnostic_reportedByDriver_licenseType: string;
  @ViewColumn() diagnostic_reportedByDriver_licenseIssueDate: Date;
  @ViewColumn() diagnostic_reportedByDriver_licenseExpiryDate: Date;
}
