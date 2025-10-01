import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateDiagnosticDto } from '@mod/service-operations/dto/create-diagnostic.dto';
import { EmployeeService } from '@mod/employee/employee.service';
import { ServiceOperation } from '@mod/service-operations/entities/service-operation.entity';
import { VehicleService } from '@mod/vehicles/vehicle.service';
import { Query } from '@shared/interfaces/query.interface';

@Injectable()
export class ServiceOperationsService {
  constructor(
    @InjectRepository(ServiceOperation)
    private readonly serviceOperationsRepository: Repository<ServiceOperation>,
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

    await this.vehicleService.findById([vehicleId]);
    const employeeEntities = await this.employeeService.findById([
      createdByEmployeeId,
      vehicleDriverEmployeeId,
      departmentManagerEmployeeId,
    ]);

    if (employeeEntities.length !== 3)
      throw new BadRequestException('Invalid employee ids');

    const serviceOperationsEntity = this.serviceOperationsRepository.create({
      createdByEmployeeId,
      vehicleDriverEmployeeId,
      departmentManagerEmployeeId,
      vehicleId,
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

  async findAll(query: Query<'serviceOperation'>): Promise<ServiceOperation[]> {
    const { limit, offset, sortBy, sortOrder } = query.pagination;
    const parameters = query.parameters;
    const where = query.where;

    const qb = this.serviceOperationsRepository
      .createQueryBuilder('serviceOperation')
      .where(where, parameters)
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
