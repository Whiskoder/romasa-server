import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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
import { User } from 'src/users/entities';
import { ScheduleAppointmentDto } from 'src/service-operations/dto/schedule-appointment.dto';
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
    const serviceOperation = await this.getServiceOperation(operationId, [
      'vehicleDriverEmployee',
      'departmentManagerEmployee',
    ]);
    const user = await this.getUserWithEmployee(userId);

    this.validateOperationStatus(
      serviceOperation,
      ServiceStatus.pending_review,
    );
    this.processApproval(user, serviceOperation);

    //this.notify

    return await this.serviceOperationsRepository.save(serviceOperation);
  }

  async scheduleAppointment(
    operationId: number,
    userId: string,
    scheduleAppointmentDto: ScheduleAppointmentDto,
  ): Promise<ServiceOperation> {
    const date = this.validateScheduleAppointmentDate(
      scheduleAppointmentDto.date,
    );

    const serviceOperation = await this.getServiceOperation(operationId);
    const user = await this.getUserWithEmployee(userId);

    this.validateOperationStatus(serviceOperation, ServiceStatus.requested);

    this.processAppointment(user, serviceOperation, date);

    return await this.serviceOperationsRepository.save(serviceOperation);
  }

  private validateScheduleAppointmentDate(date: string): Date {
    const appointmentDate = new Date(date);

    const now = new Date();
    if (appointmentDate < now) {
      throw new BadRequestException(
        'La fecha de cita no puede ser anterior a la fecha actual',
      );
    }

    const differenceInMs = appointmentDate.getTime() - now.getTime();
    const differenceInHours = differenceInMs / (1000 * 60 * 60);

    // Validar intervalo mínimo de 2 horas
    if (differenceInHours < 2) {
      throw new BadRequestException(
        'La fecha de cita debe tener al menos 2 horas de anticipación desde la hora actual',
      );
    }

    return appointmentDate;
  }

  private async getUserWithEmployee(userId: string): Promise<User> {
    const user = await this.userService.findById(userId, ['employee']);

    if (!user) {
      throw new InternalServerErrorException(
        'Usuario autenticado no encontrado en la base de datos',
      );
    }

    if (!user.employee) {
      throw new BadRequestException('El usuario no tiene un empleado asociado');
    }

    return user;
  }

  private async getServiceOperation(
    operationId: number,
    relations?: string[],
  ): Promise<ServiceOperation> {
    const serviceOperation = await this.serviceOperationsRepository.findOne({
      where: { id: operationId },
      relations,
    });

    if (!serviceOperation) {
      throw new NotFoundException('Operación de servicio no encontrada');
    }

    return serviceOperation;
  }

  private validateOperationStatus(
    serviceOperation: ServiceOperation,
    status: ServiceStatus,
  ): void {
    if (serviceOperation.status !== status) {
      throw new BadRequestException(
        `La operación debe estar en estado "${status}". Estado actual: ${serviceOperation.status}`,
      );
    }
  }

  private processAppointment(
    user: User,
    serviceOperation: ServiceOperation,
    date: Date,
  ): void {
    const { employee } = user;
    serviceOperation.scheduledByEmployee = employee;
    serviceOperation.diagnosticAppoinmentDate = date;
  }

  private processApproval(
    user: User,
    serviceOperation: ServiceOperation,
  ): void {
    const { role, employee } = user;

    if (role === Roles.driver) {
      this.approveAsDriver(employee.id, serviceOperation);
    } else {
      this.approveAsManager(employee.id, serviceOperation);
    }
  }

  private approveAsDriver(
    employeeId: number,
    serviceOperation: ServiceOperation,
  ): void {
    if (!serviceOperation.vehicleDriverEmployee) {
      throw new InternalServerErrorException(
        'La operación no tiene un conductor asignado',
      );
    }

    if (serviceOperation.vehicleDriverEmployee.id !== employeeId) {
      throw new ForbiddenException(
        'No eres el conductor asignado a esta operación',
      );
    }

    if (serviceOperation.approvedByDriver) {
      throw new BadRequestException('Ya aprobaste esta operación previamente');
    }

    serviceOperation.approvedByDriver = true;
  }

  private approveAsManager(
    employeeId: number,
    serviceOperation: ServiceOperation,
  ): void {
    if (!serviceOperation.departmentManagerEmployee) {
      throw new InternalServerErrorException(
        'La operación no tiene un encargado asignado',
      );
    }

    if (serviceOperation.departmentManagerEmployee.id !== employeeId) {
      throw new ForbiddenException(
        'No eres el encargado asignado a esta operación',
      );
    }

    if (serviceOperation.approvedByDepartmentManager) {
      throw new BadRequestException('Ya aprobaste esta operación previamente');
    }

    serviceOperation.approvedByDepartmentManager = true;
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
