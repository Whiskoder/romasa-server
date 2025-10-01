import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';

import { Vehicle } from '@mod/vehicles/entities/vehicle.entity';
import { QueryVehicleDto } from '@mod/vehicles/dto/query-vehicle.dto';
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_OFFSET,
} from '@shared/constants/pagination.constant';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async findAll(query: QueryVehicleDto): Promise<Vehicle[]> {
    const {
      limit = DEFAULT_PAGINATION_LIMIT,
      offset = DEFAULT_PAGINATION_OFFSET,
      likeLicensePlate,
    } = query;

    const queryBuilder = () => {
      // TODO: move to fn and add sortBy & orderBy

      const qb = this.vehicleRepository.createQueryBuilder('vehicle');

      if (likeLicensePlate) {
        qb.where(`UPPER(vehicle.licensePlate) LIKE UPPER(:licensePlate)`, {
          licensePlate: `${likeLicensePlate}%`,
        });
        qb.orderBy(`vehicle.licensePlate`, 'ASC');
        return qb;
      }

      return qb;
    };

    const vehicles = await queryBuilder().take(limit).skip(offset).getMany();

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
