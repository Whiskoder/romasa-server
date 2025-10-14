import { NullableType } from 'src/core/types';
import { Customer } from 'src/customers/domain';

export abstract class CustomerRepository {
  abstract create(
    data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Customer>;

  abstract findById(id: string): Promise<NullableType<Customer>>;
}
