import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { VehicleRepository } from 'src/vehicles/infraestructure/persistence/vehicle.repository';
import { VehicleEntity } from 'src/vehicles/infraestructure/persistence/relational/entities';
import { VehicleMapper } from 'src/vehicles/infraestructure/persistence/relational/mappers/vehicle.mapper';
import { Vehicle } from 'src/vehicles/domain';
import { NullableType } from 'src/core/types';

@Injectable()
export class VehicleRelationalRepository implements VehicleRepository {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
  ) {}

  async findById(id: number): Promise<NullableType<Vehicle>> {
    const entity = await this.vehicleRepository.findOne({
      where: { id },
    });

    return entity ? VehicleMapper.toDomain(entity) : null;
  }
}
