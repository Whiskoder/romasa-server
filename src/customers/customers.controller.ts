import { Controller } from '@nestjs/common';
import { CustomersService } from 'src/customers/customers.service';

@Controller({
  version: '1',
  path: 'customers',
})
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}
}
