import { Pagination } from '@shared/interfaces/pagination.interface';
import { ModelMappingsForWhere } from './model-mappings-for-where.interface';

export interface Query<T extends keyof ModelMappingsForWhere> {
  where: string;
  parameters: Record<string, any>;
  pagination: Pagination<T>;
}
