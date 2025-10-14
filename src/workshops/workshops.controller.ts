import { Body, Controller, Post } from '@nestjs/common';
import { AuthGuard } from 'src/auth/decorators';

import { CreateWorkshopDto, ResponseWorkshopDto } from 'src/workshops/dto';
import { WorkshopMapper } from 'src/workshops/mappers';
import { WorkshopsService } from 'src/workshops/workshops.service';

@Controller({
  version: '1',
  path: 'workshops',
})
@AuthGuard()
export class WorkshopsController {
  constructor(private readonly workshopsService: WorkshopsService) {}

  @Post()
  async create(
    @Body() createWorkshopDto: CreateWorkshopDto,
  ): Promise<{ workshop: ResponseWorkshopDto }> {
    const workshop = await this.workshopsService.create(createWorkshopDto);
    return { workshop: WorkshopMapper.toResponseDto(workshop) };
  }
}
