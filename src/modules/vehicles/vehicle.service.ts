import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';

import { Vehicle } from '@mod/vehicles/entities/vehicle.entity';
import { Query } from '@shared/interfaces/query.interface';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async findAll(query: Query<'vehicle'>): Promise<Vehicle[]> {
    const { limit, offset, sortBy, sortOrder } = query.pagination;
    const parameters = query.parameters;
    const where = query.where;

    const qb = this.vehicleRepository
      .createQueryBuilder('vehicle')
      .where(where, parameters)
      .orderBy(`vehicle.${sortBy}`, sortOrder)
      .take(limit)
      .skip(offset)
      .getMany();

    const vehicles = await qb;

    if (vehicles.length === 0) throw new NotFoundException('No vehicles found');

    return vehicles;
  }

  async findById(vehicleIds: number[]): Promise<Vehicle[]> {
    const vehicleEntities = await this.vehicleRepository.findBy({
      id: In(vehicleIds), // TODO: add validations
    });

    if (vehicleEntities.length === 0)
      throw new NotFoundException('No vehicles found');
    return vehicleEntities;
  }
}
