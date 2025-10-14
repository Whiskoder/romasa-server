import { NullableType } from 'src/core/types';
import { User } from 'src/users/domain';

export abstract class UserRepository {
  abstract create(
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>,
  ): Promise<User>;
  abstract findByEmail(email: string): Promise<NullableType<User>>;
  abstract findById(id: string): Promise<NullableType<User>>;
}
