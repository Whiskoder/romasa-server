import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from 'src/core/decorators';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto, ResponseUserDto } from 'src/users/dto';
import { UserMapper } from 'src/users/mappers';
import { AuthGuard } from 'src/auth/decorators';
import { Permissions } from 'src/permissions/constants';
import { ResponsePaginationDto } from 'src/core/dto';
import { SearchFilterAndPaginationInterceptor } from 'src/core/interceptors';
import { User } from './entities';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @AuthGuard(Permissions.users.create)
  @ApiResponse(201, 'User created')
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ user: ResponseUserDto }> {
    const userObject = await this.usersService.create(createUserDto);
    const userDto = UserMapper.toResponseDto(userObject);
    return { user: userDto };
  }

  @Get()
  @AuthGuard(Permissions.users.view_all)
  @UseInterceptors(
    new SearchFilterAndPaginationInterceptor<User>(
      ['email'],
      ['employee', 'group'],
    ),
  )
  @ApiResponse(200, 'Users found')
  async findAll(
    @Req() request: Request,
  ): Promise<{ users: ResponseUserDto[]; pagination: ResponsePaginationDto }> {
    const [users, pagination] = await this.usersService.findAllWithPagination(
      request as any,
    );
    return { users: UserMapper.toResponseDtoList(users), pagination };
  }
}
