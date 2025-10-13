import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerEntity } from 'src/customers/infraestructure/persistence/relational/entities';
import { CustomerRelationalRepository } from 'src/customers/infraestructure/persistence/relational/repositories';
import { CustomerRepository } from 'src/customers/infraestructure/persistence/customer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  providers: [
    {
      provide: CustomerRepository,
      useClass: CustomerRelationalRepository,
    },
  ],
  exports: [CustomerRepository],
})
export class RelationalCustomerPersistenceModule {}
