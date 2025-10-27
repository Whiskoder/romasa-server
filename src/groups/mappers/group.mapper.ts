import { plainToInstance } from 'class-transformer';

import { ResponseGroupDto } from 'src/groups/dto';
import { Group } from 'src/groups/entities/group.entity';
import { UserMapper } from 'src/users/mappers';

export class GroupMapper {
  static toResponseDto(entity: Group): ResponseGroupDto {
    const dto = plainToInstance(ResponseGroupDto, {
      id: entity.id,
      name: entity.name,
      isActive: entity.isActive,
      permissions: entity.permissions
        ? entity.permissions.split(',')
        : undefined,
      users: entity.users
        ? UserMapper.toResponseDtoList(entity.users)
        : undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      workOrderDiagnosticApprovers: entity.woDiagnosticApprovers
        ? UserMapper.toResponseDtoList(entity.woDiagnosticApprovers)
        : undefined,
    });
    return dto;
  }

  static toResponseDtoList(entities: Group[]): ResponseGroupDto[] {
    return entities.map((group) => GroupMapper.toResponseDto(group));
  }
}
