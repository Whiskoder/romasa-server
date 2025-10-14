import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { WorkshopRepository } from 'src/workshops/infraestructure/persistence/workshop.repository';
import { WorkshopEntity } from 'src/workshops/infraestructure/persistence/relational/entities';
import { WorkshopMapper } from 'src/workshops/infraestructure/persistence/relational/mappers/workshop.mapper';
import { Workshop } from 'src/workshops/domain';
import { NullableType } from 'src/core/types';
import { uuidPlugin } from 'src/core/plugins';

@Injectable()
export class WorkshopRelationalRepository implements WorkshopRepository {
  constructor(
    @InjectRepository(WorkshopEntity)
    private readonly workshopRepository: Repository<WorkshopEntity>,
  ) {}

  async create(data: Workshop): Promise<Workshop> {
    const persistenceModel = WorkshopMapper.toPersistence(data);

    const newEntity = this.workshopRepository.create({
      ...persistenceModel,
      id: uuidPlugin.v7(),
    });
    await this.workshopRepository.save(newEntity);

    return WorkshopMapper.toDomain(newEntity);
  }

  async findById(id: string): Promise<NullableType<Workshop>> {
    const entity = await this.workshopRepository.findOne({
      where: { id },
    });

    return entity ? WorkshopMapper.toDomain(entity) : null;
  }
}
