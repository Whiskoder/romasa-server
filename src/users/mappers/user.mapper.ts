import { plainToInstance } from 'class-transformer';

import { ResponseUserDto } from 'src/users/dto';
import { User } from 'src/users/domain';

export class UserMapper {
  static toResponseDto(user: User): ResponseUserDto {
    const dto = plainToInstance(ResponseUserDto, user);
    return dto;
  }

  static toResponseDtoList(users: User[]): ResponseUserDto[] {
    return users.map((user) => this.toResponseDto(user));
  }
}
