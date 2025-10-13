import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { WorkshopRepository } from 'src/workshops/infraestructure/persistence/workshop.repository';
import { WorkshopEntity } from 'src/workshops/infraestructure/persistence/relational/entities';

@Injectable()
export class WorkshopRelationalRepository implements WorkshopRepository {
  constructor(
    @InjectRepository(WorkshopEntity)
    private readonly workshopRepository: Repository<WorkshopEntity>,
  ) {}
}
