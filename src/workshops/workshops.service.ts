import { Injectable } from '@nestjs/common';

import { WorkshopRepository } from 'src/workshops/infraestructure/persistence/workshop.repository';
import { Workshop } from 'src/workshops/domain';
import { NullableType } from 'src/core/types';
import { CreateWorkshopDto } from 'src/workshops/dto';

@Injectable()
export class WorkshopsService {
  constructor(private readonly workshopRepository: WorkshopRepository) {}

  async create(createWorkshopDto: CreateWorkshopDto): Promise<Workshop> {
    const { name, capacity } = createWorkshopDto;

    // TODO: check if name is unique

    return this.workshopRepository.create({
      name,
      capacity,
    });
  }

  findById(workshopId: string): Promise<NullableType<Workshop>> {
    return this.workshopRepository.findById(workshopId);
  }
}
