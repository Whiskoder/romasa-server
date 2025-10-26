import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/decorators';
import { ApiResponse } from 'src/core/decorators';
import { ResponsePaginationDto } from 'src/core/dto';
import { SearchFilterAndPaginationInterceptor } from 'src/core/interceptors';
import { CustomersService } from 'src/customers/customers.service';
import { CreateCustomerDto, ResponseCustomerDto } from 'src/customers/dto';
import { CustomerMapper } from 'src/customers/mappers';
import { Permissions } from 'src/permissions/constants';
import { Customer } from 'src/customers/entities';
import { CustomerNotFoundException } from 'src/customers/exceptions';

@Controller({
  version: '1',
  path: 'customers',
})
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @AuthGuard(Permissions.customers.create)
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<{ customer: ResponseCustomerDto }> {
    const customer = await this.customersService.create(createCustomerDto);
    return { customer: CustomerMapper.toResponseDto(customer) };
  }

  @Get()
  @AuthGuard(Permissions.customers.view_all)
  @ApiResponse(200, 'Lista de clientes')
  @UseInterceptors(
    new SearchFilterAndPaginationInterceptor<Customer>(['name'], []),
  )
  async findAll(@Req() req: Request): Promise<{
    customers: ResponseCustomerDto[];
    pagination: ResponsePaginationDto;
  }> {
    const [customers, pagination] =
      await this.customersService.findAllWithPagination(req as any);
    if (!customers.length) throw new CustomerNotFoundException();
    return {
      customers: CustomerMapper.toResponseDtoList(customers),
      pagination,
    };
  }
}
