import { ModelMappingsForWhere } from 'src/shared/interfaces';

export interface Pagination<T extends keyof ModelMappingsForWhere> {
  offset: number;
  limit: number;
  sortBy: keyof ModelMappingsForWhere[T];
  sortOrder: 'ASC' | 'DESC';
}
