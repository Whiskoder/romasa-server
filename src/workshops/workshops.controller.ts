import { Controller } from '@nestjs/common';
import { WorkshopsService } from 'src/workshops/workshops.service';

@Controller({
  version: '1',
  path: 'workshops',
})
export class WorkshopsController {
  constructor(private readonly workshopsService: WorkshopsService) {}
}
