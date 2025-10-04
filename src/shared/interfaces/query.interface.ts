import { Pagination, ModelMappingsForWhere } from 'src/shared/interfaces';

export interface Query<T extends keyof ModelMappingsForWhere> {
  where: string;
  parameters: Record<string, any>;
  pagination: Pagination<T>;
}
