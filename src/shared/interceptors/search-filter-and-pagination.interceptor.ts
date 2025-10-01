import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import * as qs from 'qs';
import { isObject, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_OFFSET,
} from '@shared/constants/pagination.constant';
import { pick } from '@shared/utils/pick.util';
import { FilterQueryDto } from '@shared/dto/filter-query.dto';
import { FilterOperationDto } from '@shared/dto/filter-operation.dto';
import { formatValidationError } from '@shared/utils/format-validation-error.util';
import { Pagination } from '@shared/interfaces/pagination.interface';
import { ModelMappingsForWhere } from '@shared/interfaces/model-mappings-for-where.interface';

// TODO: implement selectable fields
// TODO: need some validations in where builder
@Injectable()
export class SearchFilterAndPaginationInterceptor<
  T extends keyof ModelMappingsForWhere,
> implements NestInterceptor
{
  constructor(
    private readonly filterableFields: Array<keyof ModelMappingsForWhere[T]>,
    private readonly alias: T,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest();
    const originalUrl = request.url;
    const queryStr = originalUrl.split('?')[1] ?? '';
    const parsedQuery = this.safeParseQuery(queryStr);

    const dto = plainToInstance(FilterQueryDto, parsedQuery);
    const errors = await validate(dto);
    if (errors.length > 0)
      throw new BadRequestException(
        errors.map((e) => formatValidationError(e)),
      );

    const {
      offset = DEFAULT_PAGINATION_OFFSET,
      limit = DEFAULT_PAGINATION_LIMIT,
      sortBy = 'id',
      sortOrder = 'asc',
      ...rawFilters
    } = dto;

    const filterFields = pick(rawFilters, this.filterableFields.map(String));

    const whereConditions: string[] = [];
    const parameters: Record<string, any> = {};
    let paramIndex = 0;

    for (const [field, rawValue] of Object.entries(filterFields)) {
      if (!isObject(rawValue)) continue;

      const filterInstance = plainToInstance(FilterOperationDto, rawValue);
      const filterErrors = await validate(filterInstance);

      if (filterErrors.length > 0)
        throw new BadRequestException(
          filterErrors.flatMap((e) => formatValidationError(e)),
        );

      for (const [operator, value] of Object.entries(filterInstance)) {
        if (value === undefined) continue;

        // Prevent multiple conditions on the same field for now
        const existingCondition = whereConditions.find((c) =>
          c.includes(`.${field} `),
        );

        if (existingCondition)
          throw new BadRequestException(
            `unsupported_multiple_search_for_same_field: ${field}`,
          );

        // Safe unique param name per field/operator
        const paramKey = `param_${field}_${paramIndex++}`;

        switch (operator) {
          case 'eq':
            whereConditions.push(
              `UPPER(${this.alias}.${field}) = UPPER(:${paramKey})`,
            );
            parameters[paramKey] = value;
            break;

          case 'like':
            whereConditions.push(
              `UPPER(${this.alias}.${field}) LIKE UPPER(:${paramKey})`,
            );
            parameters[paramKey] = value;
            break;

          case 'ilike':
            whereConditions.push(
              `UPPER(${this.alias}.${field}) LIKE UPPER(:${paramKey})`,
            );
            parameters[paramKey] = value;
            break;

          case 'gt':
            whereConditions.push(`${this.alias}.${field} > :${paramKey}`);
            parameters[paramKey] = value;
            break;

          case 'lt':
            whereConditions.push(`${this.alias}.${field} < :${paramKey}`);
            parameters[paramKey] = value;
            break;

          default:
            throw new BadRequestException(`unsupported_operator_in[${field}]`);
        }
      }
    }

    const where = whereConditions.join(' AND ');

    const validatedSortBy: keyof ModelMappingsForWhere[T] =
      this.filterableFields.includes(sortBy as keyof ModelMappingsForWhere[T])
        ? (sortBy as keyof ModelMappingsForWhere[T])
        : ('id' as keyof ModelMappingsForWhere[T]);

    const validatedSortOrder = sortOrder.toUpperCase() as 'ASC' | 'DESC';

    const pagination: Pagination<T> = {
      offset,
      limit,
      sortBy: validatedSortBy,
      sortOrder: validatedSortOrder,
    };

    request['pagination'] = pagination;
    request['where'] = where;
    request['parameters'] = parameters;

    return next.handle();
  }

  private safeParseQuery = (queryStr: string): Record<string, any> => {
    try {
      return qs.parse(queryStr);
    } catch (e) {
      throw new BadRequestException('invalid_search_query');
    }
  };
}
