import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from 'src/core/decorators';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto, ResponseUserDto } from 'src/users/dto';
import { UserMapper } from 'src/users/mappers';
import { AuthGuard } from 'src/auth/decorators';

@Controller({
  version: '1',
  path: 'users',
})
// @AuthGuard()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // TODO: add guards
  @ApiResponse(201, 'User created')
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ user: ResponseUserDto }> {
    const userObject = await this.usersService.create(createUserDto);
    const userDto = UserMapper.toResponseDto(userObject);
    return { user: userDto };
  }
}
