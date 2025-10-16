import { Pagination, ModelMappingsForWhere } from 'src/core/interfaces';

export interface Query<T> {
  where: string;
  parameters: Record<string, any>;
  pagination: Pagination<T>;
}
