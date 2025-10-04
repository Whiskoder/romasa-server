import { Injectable } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

import { User } from 'src/users/entities/user.entity';
import { ResponseUserDto } from '../dtos/response-user.dto';

@Injectable()
export class UserMapper {
  constructor() {}

  toResponseDto(userEntity: User): ResponseUserDto {
    const dto = plainToInstance(ResponseUserDto, userEntity);

    return dto;
  }

  toResponseDtoList(userEntities: User[]): ResponseUserDto[] {
    return userEntities.map((e) => this.toResponseDto(e));
  }
}
