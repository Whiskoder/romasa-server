import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateDiagnosticDto } from '@mod/service-operations/dto/create-diagnostic.dto';
import { EmployeeService } from '@mod/employee/employee.service';
import { QueryServiceOperationsDto } from '@mod/service-operations/dto/query-service-operations.dto';
import { ServiceOperations } from '@mod/service-operations/entities/service-operations.entity';
import { VehicleService } from '@mod/vehicles/vehicle.service';
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_OFFSET,
} from '@shared/constants/pagination.constant';

@Injectable()
export class ServiceOperationsService {
  constructor(
    @InjectRepository(ServiceOperations)
    private readonly serviceOperationsRepository: Repository<ServiceOperations>,
    private readonly employeeService: EmployeeService,
    private readonly vehicleService: VehicleService,
  ) {}

  async create(
    createDiagnosticDto: CreateDiagnosticDto,
  ): Promise<ServiceOperations> {
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

  async findAll(
    query: QueryServiceOperationsDto,
  ): Promise<ServiceOperations[]> {
    const {
      limit = DEFAULT_PAGINATION_LIMIT,
      offset = DEFAULT_PAGINATION_OFFSET,
      equalStatus,
    } = query;

    const queryBuilder = () => {
      const qb =
        this.serviceOperationsRepository.createQueryBuilder(
          'serviceOperations',
        );

      if (equalStatus) {
        qb.where(`serviceOperations.status = :status`, {
          status: equalStatus,
        });
        qb.orderBy(`serviceOperations.priority`, 'ASC');
        return qb;
      }

      return qb;
    };

    const serviceOperations = await queryBuilder()
      .take(limit)
      .skip(offset)
      .getMany();

    if (serviceOperations.length === 0)
      throw new BadRequestException('No service operations found');

    return serviceOperations;
  }
}
