import { Pagination, ModelMappingsForWhere } from 'src/core/interfaces';

export interface Query<T extends keyof ModelMappingsForWhere> {
  where: string;
  parameters: Record<string, any>;
  pagination: Pagination<T>;
}
