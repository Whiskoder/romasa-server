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
} from 'src/core/constants';
import { pick, formatValidationError } from 'src/core/utils';
import { FilterQueryDto, FilterOperationDto } from 'src/core/dto';
import { Pagination } from 'src/core/interfaces';
import { Equal, ILike, LessThan, Like, MoreThan } from 'typeorm';

// TODO: implement selectable fields
// TODO: need some validations in where builder
@Injectable()
export class SearchFilterAndPaginationInterceptor<T>
  implements NestInterceptor
{
  constructor(
    private readonly filterableFields: Array<keyof T>,
    private readonly relations: Array<keyof T>,
  ) {}

  /**
   *
   * TODO:
   * Validar si el dato del campo es valido con el tipo de filtro
   * Por ejemplo MoreThan solo acepta numeros o fechas
   */
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest();
    const originalUrl = request.url;
    const queryStr = originalUrl.split('?')[1] ?? '';
    const parsedQuery = this.safeParseQuery(queryStr);

    const dto = plainToInstance(FilterQueryDto<T>, parsedQuery);
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
      relations = '',
      ...rawFilters
    } = dto;

    const filterFields = pick(rawFilters, this.filterableFields.map(String));

    const whereConditions: string[] = [];

    const where = {};

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

        switch (operator) {
          case 'eq':
            where[field] = Equal(value);
            break;

          case 'like':
            where[field] = Like(value);
            break;

          case 'ilike':
            where[field] = ILike(value);
            break;

          case 'gt':
            where[field] = MoreThan(value);
            break;

          case 'lt':
            where[field] = LessThan(value);
            break;

          default:
            throw new BadRequestException(`unsupported_operator_in[${field}]`);
        }
      }
    }

    const validatedSortBy = this.filterableFields.includes(sortBy as keyof T)
      ? (sortBy as keyof T)
      : ('id' as keyof T);

    const validatedRelations = relations
      .split(',')
      .filter((r) => this.relations.includes(r as keyof T));

    const validatedSortOrder = sortOrder.toUpperCase() as 'ASC' | 'DESC';

    const pagination: Pagination<T> = {
      offset,
      limit,
      sortBy: validatedSortBy,
      sortOrder: validatedSortOrder,
    };

    request['pagination'] = pagination;
    request['where'] = where;
    request['relations'] = validatedRelations;

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
