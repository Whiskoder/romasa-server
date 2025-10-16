import { plainToInstance } from 'class-transformer';

import { ResponseGroupDto } from 'src/groups/dto';
import { Group } from 'src/groups/entities';
import { UserMapper } from 'src/users/mappers';

export class GroupMapper {
  static toResponseDto(entity: Group): ResponseGroupDto {
    const dto = plainToInstance(ResponseGroupDto, {
      id: entity.id,
      name: entity.name,
      isActive: entity.isActive,
      permissions: entity.permissions,
      users: entity.users ? UserMapper.toResponseDtoList(entity.users) : [],
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
    return dto;
  }

  static toResponseDtoList(entities: Group[]): ResponseGroupDto[] {
    return entities.map((group) => GroupMapper.toResponseDto(group));
  }
}
