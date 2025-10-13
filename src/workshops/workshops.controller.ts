import { WorkshopsService } from 'src/workshops/workshops.service';

export class WorkshopsController {
  constructor(private readonly workshopsService: WorkshopsService) {}
}
