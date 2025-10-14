import { Body, Controller, Post } from '@nestjs/common';

import { AuthGuard } from 'src/auth/decorators';
import { CustomersService } from 'src/customers/customers.service';
import { CreateCustomerDto, ResponseCustomerDto } from 'src/customers/dto';
import { CustomerMapper } from 'src/customers/mappers';

@Controller({
  version: '1',
  path: 'customers',
})
@AuthGuard()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<{ customer: ResponseCustomerDto }> {
    const customer = await this.customersService.create(createCustomerDto);
    return { customer: CustomerMapper.toResponseDto(customer) };
  }
}
