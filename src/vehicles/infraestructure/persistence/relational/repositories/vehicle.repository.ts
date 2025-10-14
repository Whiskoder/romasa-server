import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { VehicleRepository } from '../../vehicle.repository';
import { VehicleEntity } from '../entities';

@Injectable()
export class VehicleRelationalRepository implements VehicleRepository {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
  ) {}
}
