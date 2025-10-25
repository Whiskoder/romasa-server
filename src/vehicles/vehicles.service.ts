import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { NullableType } from 'src/core/types';
import { Vehicle } from 'src/vehicles/entities';
import { Query } from 'src/core/interfaces';
import { ResponsePaginationDto } from 'src/core/dto';
import { createPagination } from 'src/core/utils';

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

  async findAllWithPagination(
    query: Query<Vehicle>,
  ): Promise<[Vehicle[], ResponsePaginationDto]> {
    const { where, relations, pagination } = query;
    const { offset, limit, sortBy, sortOrder } = pagination;

    const [entities, total] = await this.vehiclesRepository.findAndCount({
      where,
      relations,
      order: { [sortBy]: sortOrder },
      take: limit,
      skip: offset,
    });

    const paginationDto = createPagination(total, limit, offset);
    return [entities, paginationDto];
  }
}
