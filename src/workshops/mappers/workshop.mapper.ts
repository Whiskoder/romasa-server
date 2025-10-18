import { plainToInstance } from 'class-transformer';

import { ResponseWorkshopDto } from 'src/workshops/dto';
import { Workshop } from 'src/workshops/entities';

export class WorkshopMapper {
  static toResponseDto(entity: Workshop): ResponseWorkshopDto {
    const dto = plainToInstance(ResponseWorkshopDto, {
      id: entity.id,
      name: entity.name,
      capacity: entity.capacity,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
    return dto;
  }

  static toResponseDtoList(entities: Workshop[]): ResponseWorkshopDto[] {
    return entities.map((workshop) => WorkshopMapper.toResponseDto(workshop));
  }
}
