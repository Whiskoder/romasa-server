import { DataSource, ViewEntity, ViewColumn } from 'typeorm';
import { ServiceOperation } from './service-operation.entity';
import { Employee } from 'src/employee/entities/employee.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';

@ViewEntity({
  // name: 'service_operation_view',
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('serviceOperation.id', 'id')
      .addSelect('serviceOperation.createdAt', 'createdAt')
      .addSelect('serviceOperation.updatedAt', 'updatedAt')

      // Campos del empleado que creó la operación
      .addSelect('createdByEmployee.firstName', 'createdByEmployeeFirstName')
      .addSelect('createdByEmployee.lastName', 'createdByEmployeeLastName')
      .addSelect('createdByEmployee.middleName', 'createdByEmployeeMiddleName')

      // Campos del jefe de departamento
      .addSelect(
        'departmentManagerEmployee.firstName',
        'departmentManagerEmployeeFirstName',
      )
      .addSelect(
        'departmentManagerEmployee.lastName',
        'departmentManagerEmployeeLastName',
      )
      .addSelect(
        'departmentManagerEmployee.middleName',
        'departmentManagerEmployeeMiddleName',
      )

      // Campos del conductor
      .addSelect(
        'vehicleDriverEmployee.firstName',
        'vehicleDriverEmployeeFirstName',
      )
      .addSelect(
        'vehicleDriverEmployee.lastName',
        'vehicleDriverEmployeeLastName',
      )
      .addSelect(
        'vehicleDriverEmployee.middleName',
        'vehicleDriverEmployeeMiddleName',
      )

      // Campos del vehículo
      .addSelect('vehicle.transportNumber', 'vehicleTransportNumber')
      .addSelect('vehicle.transportSubTypeId', 'vehicleTransportSubTypeId')
      .addSelect('vehicle.brand', 'vehicleBrand')
      .addSelect('vehicle.model', 'vehicleModel')
      .addSelect('vehicle.manufactureYear', 'vehicleManufactureYear')
      .addSelect('vehicle.verificationNumber', 'vehicleVerificationNumber')
      .addSelect('vehicle.licensePlate', 'vehicleLicensePlate')

      .from(ServiceOperation, 'serviceOperation')
      .leftJoin('serviceOperation.createdByEmployee', 'createdByEmployee')
      .leftJoin(
        'serviceOperation.departmentManagerEmployee',
        'departmentManagerEmployee',
      )
      .leftJoin(
        'serviceOperation.vehicleDriverEmployee',
        'vehicleDriverEmployee',
      )
      .leftJoin('serviceOperation.vehicle', 'vehicle'),
})
export class ServiceOperationDetail {
  @ViewColumn()
  id: number;

  @ViewColumn()
  createdAt: Date;

  @ViewColumn()
  updatedAt: Date;

  // Empleado que creó
  @ViewColumn()
  createdByEmployeeFirstName: string;

  @ViewColumn()
  createdByEmployeeLastName: string;

  @ViewColumn()
  createdByEmployeeMiddleName: string;

  // Jefe de departamento
  @ViewColumn()
  departmentManagerEmployeeFirstName: string;

  @ViewColumn()
  departmentManagerEmployeeLastName: string;

  @ViewColumn()
  departmentManagerEmployeeMiddleName: string;

  // Conductor
  @ViewColumn()
  vehicleDriverEmployeeFirstName: string;

  @ViewColumn()
  vehicleDriverEmployeeLastName: string;

  @ViewColumn()
  vehicleDriverEmployeeMiddleName: string;

  // Vehículo
  @ViewColumn()
  vehicleTransportNumber: string;

  @ViewColumn()
  vehicleTransportSubTypeId: number;

  @ViewColumn()
  vehicleBrand: string;

  @ViewColumn()
  vehicleModel: string;

  @ViewColumn()
  vehicleManufactureYear: number;

  @ViewColumn()
  vehicleVerificationNumber: string;

  @ViewColumn()
  vehicleLicensePlate: string;
}
