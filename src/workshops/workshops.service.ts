import { Injectable } from '@nestjs/common';

import { WorkshopRepository } from 'src/workshops/infraestructure/persistence/workshop.repository';

@Injectable()
export class WorkshopsService {
  constructor(private readonly workshopRepository: WorkshopRepository) {}
}
