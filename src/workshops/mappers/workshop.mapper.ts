import { plainToInstance } from 'class-transformer';

import { Workshop } from 'src/workshops/domain';
import { ResponseWorkshopDto } from 'src/workshops/dto';

export class WorkshopMapper {
  static toResponseDto(workshop: Workshop): ResponseWorkshopDto {
    const dto = plainToInstance(ResponseWorkshopDto, workshop);
    return dto;
  }

  static toResponseDtoList(workshops: Workshop[]): ResponseWorkshopDto[] {
    return workshops.map((workshop) => WorkshopMapper.toResponseDto(workshop));
  }
}
