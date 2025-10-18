import { Pagination, ModelMappingsForWhere } from 'src/core/interfaces';
import { FindOptionsWhere } from 'typeorm';

export interface Query<T> {
  where: FindOptionsWhere<T>;
  relations: Array<keyof T>;
  pagination: Pagination<T>;
}
