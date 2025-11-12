import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from 'src/core/decorators';
import { UsersService } from 'src/users/users.service';
import { ResponseUserDto } from 'src/users/dto';
import { UserMapper } from 'src/users/mappers';
import { AuthGuard } from 'src/auth/decorators';
import { Permissions } from 'src/permissions/constants';
import { ResponsePaginationDto } from 'src/core/dto';
import { SearchFilterAndPaginationInterceptor } from 'src/core/interceptors';
import { User } from 'src/users/entities/user.entity';
import { UserNotFoundException } from 'src/users/exceptions';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @AuthGuard(Permissions.users.view_all)
  @UseInterceptors(
    new SearchFilterAndPaginationInterceptor<User>(
      ['email'],
      ['employee', 'group'],
    ),
  )
  @ApiResponse(200, 'Usuarios encontrados')
  async findAll(
    @Req() request: Request,
  ): Promise<{ users: ResponseUserDto[]; pagination: ResponsePaginationDto }> {
    const [users, pagination] = await this.usersService.findAllWithPagination(
      request as any,
    );
    return { users: UserMapper.toResponseDtoList(users), pagination };
  }

  @Get('employee/:employeeId')
  @AuthGuard(Permissions.users.view_all)
  @ApiResponse(200, 'Usuario encontrado')
  async findByEmployeeId(
    @Param('employeeId', new ParseIntPipe())
    employeeId: number,
  ): Promise<{ user: ResponseUserDto }> {
    const user = await this.usersService.findByEmployeeId(employeeId);
    if (!user) throw new UserNotFoundException();
    return { user: UserMapper.toResponseDto(user) };
  }

  @Get('email/:email')
  @AuthGuard(Permissions.users.view_all)
  @ApiResponse(200, 'Usuario encontrado')
  async findByEmail(
    @Param('email') email: string,
  ): Promise<{ user: ResponseUserDto }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UserNotFoundException();
    return { user: UserMapper.toResponseDto(user) };
  }
}
