import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateDiagnosticDto } from 'src/service-operations/dto/create-diagnostic.dto';
import { EmployeeService } from 'src/employee/employee.service';
import { ServiceOperation } from 'src/service-operations/entities/service-operation.entity';
import { VehicleService } from 'src/vehicles/vehicle.service';
import { Query } from '@shared/interfaces/query.interface';
import { Employee } from 'src/employee/entities/employee.entity';
import { ServiceOperationDetail } from 'src/service-operations/entities/service-operation-detail.view';
@Injectable()
export class ServiceOperationsService {
  constructor(
    @InjectRepository(ServiceOperation)
    private readonly serviceOperationsRepository: Repository<ServiceOperation>,
    @InjectRepository(ServiceOperationDetail)
    private readonly serviceOperationDetailsRepository: Repository<ServiceOperationDetail>,
    private readonly employeeService: EmployeeService,
    private readonly vehicleService: VehicleService,
  ) {}

  async create(
    createDiagnosticDto: CreateDiagnosticDto,
  ): Promise<ServiceOperation> {
    const {
      createdByEmployeeId,
      vehicleDriverEmployeeId,
      departmentManagerEmployeeId,
      vehicleId,
      affectsOperability,
      branch,
      priority,
      vehicleFailure,
      vehicleFuelLevel,
      vehicleInventory,
      vehicleMileage,
    } = createDiagnosticDto;

    const hasRepeatedIds =
      new Set([
        createdByEmployeeId,
        vehicleDriverEmployeeId,
        departmentManagerEmployeeId,
      ]).size !== 3;

    if (hasRepeatedIds) throw new BadRequestException('Repeated employee ids');

    const [vehicle] = await this.vehicleService.findById([vehicleId]);
    const employeeEntities = await this.employeeService.findById([
      createdByEmployeeId,
      vehicleDriverEmployeeId,
      departmentManagerEmployeeId,
    ]);

    const createdByEmployee = employeeEntities.find(
      (e) => e.id === createdByEmployeeId,
    );
    const vehicleDriverEmployee = employeeEntities.find(
      (e) => e.id === vehicleDriverEmployeeId,
    );
    const departmentManagerEmployee = employeeEntities.find(
      (e) => e.id === departmentManagerEmployeeId,
    );

    if (
      !createdByEmployee &&
      !vehicleDriverEmployee &&
      !departmentManagerEmployee
    )
      throw new BadRequestException('Invalid employee ids');

    const serviceOperationsEntity = this.serviceOperationsRepository.create({
      createdByEmployee,
      vehicleDriverEmployee,
      departmentManagerEmployee,
      vehicle,
      affectsOperability,
      branch,
      priority,
      vehicleFailure,
      vehicleFuelLevel,
      vehicleInventory: vehicleInventory.join(','),
      vehicleMileage,
      folio: '123',
    });

    await this.serviceOperationsRepository.save(serviceOperationsEntity);

    return serviceOperationsEntity;
  }

  // async findAll(
  //   query: Query<'service_operation_details'>,
  // ): Promise<ServiceOperation[]> {
  //   const { limit, offset, sortBy, sortOrder } = query.pagination;
  //   const parameters = query.parameters;
  //   const where = query.where; // TODO: add validations

  //   const qb = this.serviceOperationDetailsRepository
  //     .createQueryBuilder('service_operation_details') // TODO <- use snake case
  //     .where(where, parameters)
  //     .orderBy(`service_operation_details.${sortBy}`, sortOrder)
  //     .take(limit)
  //     .skip(offset)
  //     .getMany();

  //   const serviceOperations = (await qb) as any;

  //   if (serviceOperations.length === 0)
  //     throw new BadRequestException('No service operations found');

  //   return serviceOperations as ServiceOperation[];
  // }

  async findAll(query: Query<'serviceOperation'>): Promise<ServiceOperation[]> {
    const { limit, offset, sortBy, sortOrder } = query.pagination;
    const parameters = query.parameters;
    const where = query.where;

    const qb = this.serviceOperationsRepository
      .createQueryBuilder('serviceOperation')
      .where(where, parameters)
      .leftJoin('serviceOperation.createdByEmployee', 'createdByEmployee')
      .addSelect([
        'createdByEmployee.firstName',
        'createdByEmployee.lastName',
        'createdByEmployee.middleName',
      ])
      .leftJoin(
        'serviceOperation.departmentManagerEmployee',
        'departmentManagerEmployee',
      )
      .addSelect([
        'departmentManagerEmployee.firstName',
        'departmentManagerEmployee.lastName',
        'departmentManagerEmployee.middleName',
      ])
      .leftJoin(
        'serviceOperation.vehicleDriverEmployee',
        'vehicleDriverEmployee',
      )
      .addSelect([
        'vehicleDriverEmployee.firstName',
        'vehicleDriverEmployee.lastName',
        'vehicleDriverEmployee.middleName',
      ])
      .leftJoin('serviceOperation.vehicle', 'vehicle')
      .addSelect([
        'vehicle.transportNumber',
        'vehicle.transportSubTypeId',
        'vehicle.brand',
        'vehicle.model',
        'vehicle.manufactureYear',
        'vehicle.verificationNumber',
        'vehicle.licensePlate',
      ])
      .orderBy(`serviceOperation.${sortBy}`, sortOrder)
      .take(limit)
      .skip(offset)
      .getMany();

    const serviceOperations = await qb;

    if (serviceOperations.length === 0)
      throw new BadRequestException('No service operations found');

    return serviceOperations;
  }
}
