import { NullableType } from 'src/core/types';
import { Workshop } from 'src/workshops/domain';

export abstract class WorkshopRepository {
  abstract create(
    data: Omit<Workshop, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Workshop>;

  abstract findById(id: string): Promise<NullableType<Workshop>>;
}
