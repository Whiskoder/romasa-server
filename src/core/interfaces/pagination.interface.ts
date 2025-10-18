import { ModelMappingsForWhere } from 'src/core/interfaces';

export interface Pagination<T> {
  offset: number;
  limit: number;
  sortBy: keyof T;
  sortOrder: 'ASC' | 'DESC';
}
