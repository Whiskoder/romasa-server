import { CustomersService } from 'src/customers/customers.service';

export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}
}
