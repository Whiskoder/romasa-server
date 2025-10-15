import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { NullableType } from 'src/core/types';
import { Vehicle } from 'src/vehicles/entities';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehiclesRepository: Repository<Vehicle>,
  ) {}

  async findById(id: number): Promise<NullableType<Vehicle>> {
    const entity = await this.vehiclesRepository.findOne({ where: { id } });
    return entity ? entity : null;
  }
}
