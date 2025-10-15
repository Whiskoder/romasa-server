import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { NullableType } from 'src/core/types';
import { CreateWorkshopDto } from 'src/workshops/dto';
import { Workshop } from 'src/workshops/entities';
import { WorkshopAlreadyExistsException } from 'src/workshops/exceptions/workshops.exceptions';
import { uuidPlugin } from 'src/core/plugins';

@Injectable()
export class WorkshopsService {
  constructor(
    @InjectRepository(Workshop)
    private readonly workshopsRepository: Repository<Workshop>,
  ) {}

  async create(createWorkshopDto: CreateWorkshopDto): Promise<Workshop> {
    const { name, capacity } = createWorkshopDto;

    const existingWorkshop = await this.findByName(name);
    if (existingWorkshop) throw new WorkshopAlreadyExistsException();

    const workshop = { id: uuidPlugin.v7(), name, capacity };

    const entity = this.workshopsRepository.create(workshop);
    await this.workshopsRepository.save(entity);

    return entity;
  }

  async findById(id: string): Promise<NullableType<Workshop>> {
    const entity = await this.workshopsRepository.findOne({ where: { id } });
    return entity ? entity : null;
  }

  async findByName(name: string): Promise<NullableType<Workshop>> {
    const entity = await this.workshopsRepository.findOne({ where: { name } });
    return entity ? entity : null;
  }
}
