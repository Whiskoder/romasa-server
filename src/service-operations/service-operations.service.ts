import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateDiagnosticDto } from 'src/service-operations/dto';
// import { Employee } from 'src/employees/entities';
import { EmployeeService } from 'src/employees/employee.service';
import { Query } from 'src/shared/interfaces';
import {
  ServiceOperationDetail,
  ServiceOperation,
} from 'src/service-operations/entities';
import { VehicleService } from 'src/vehicles/vehicle.service';
import { UserService } from 'src/users/user.service';
import { ServiceStatus } from './enums';
import { Roles } from 'src/users/enums';
@Injectable()
export class ServiceOperationsService {
  constructor(
    @InjectRepository(ServiceOperation)
    private readonly serviceOperationsRepository: Repository<ServiceOperation>,
    @InjectRepository(ServiceOperationDetail)
    private readonly serviceOperationDetailsRepository: Repository<ServiceOperationDetail>,
    private readonly employeeService: EmployeeService,
    private readonly vehicleService: VehicleService,
    private readonly userService: UserService,
  ) {}

  async create(
    userId: string,
    createDiagnosticDto: CreateDiagnosticDto,
  ): Promise<ServiceOperation> {
    const {
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

    const userEntity = await this.userService.findById(userId, ['employee']);

    if (!userEntity) throw new InternalServerErrorException('User not found');

    const [vehicle] = await this.vehicleService.findById([vehicleId]);
    const employeeEntities = await this.employeeService.findById([
      vehicleDriverEmployeeId,
      departmentManagerEmployeeId,
    ]);

    const vehicleDriverEmployee = employeeEntities.find(
      (e) => e.id === vehicleDriverEmployeeId,
    );
    const departmentManagerEmployee = employeeEntities.find(
      (e) => e.id === departmentManagerEmployeeId,
    );

    if (!vehicleDriverEmployee && !departmentManagerEmployee)
      throw new BadRequestException('Invalid employee ids');

    const serviceOperationsEntity = this.serviceOperationsRepository.create({
      createdByEmployee: userEntity.employee,
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

  async approve(
    operationId: number,
    userId: string,
  ): Promise<ServiceOperation> {
    const userEntity = await this.userService.findById(userId);

    if (!userEntity) throw new InternalServerErrorException('User not found');

    const serviceOperation = await this.serviceOperationsRepository.findOne({
      where: { id: operationId },
      relations: ['driverEmployee', 'departmentManagerEmployee'],
    });

    if (!serviceOperation)
      throw new BadRequestException('Service operation not found');

    if (serviceOperation.status !== ServiceStatus.requested)
      throw new BadRequestException(
        'Service operation not in requested status',
      );

    const userRole = userEntity.role;
    const userEmployeeId = userEntity.employee.id;

    if (userRole === Roles.driver) {
      if (serviceOperation.vehicleDriverEmployee.id !== userEmployeeId)
        throw new BadRequestException('User is driver');
    
      serviceOperation.approvedByDriver = true;
    } else {
      if (serviceOperation.departmentManagerEmployee.id !== userEmployeeId)
        throw new BadRequestException('User is warehouse manager');

      serviceOperation.approvedByDepartmentManager = true;
    }

    await this.serviceOperationsRepository.save(serviceOperation);
    return serviceOperation;
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
