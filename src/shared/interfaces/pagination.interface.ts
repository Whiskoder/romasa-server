import { ModelMappingsForWhere } from '@shared/interfaces/model-mappings-for-where.interface';

export interface Pagination<T extends keyof ModelMappingsForWhere> {
  offset: number;
  limit: number;
  sortBy: keyof ModelMappingsForWhere[T];
  sortOrder: 'ASC' | 'DESC';
}
