import { Module } from '@nestjs/common';

import { RelationalCustomerPersistenceModule } from 'src/customers/infraestructure/persistence/relational/relational-persistence.module';
import { CustomersController } from 'src/customers/customers.controller';
import { CustomersService } from 'src/customers/customers.service';

@Module({
  imports: [RelationalCustomerPersistenceModule],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService, RelationalCustomerPersistenceModule],
})
export class CustomerModule {}
