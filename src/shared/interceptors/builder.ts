// Decodificar la QueryString
// Extraer los terminos
// searchTerm, offset, limit, sortBy, sortOder
// Elegir solo los filterableFields de la query
// COnstruir el where
// Aplicar transformaciones para Numeros, Fechas y Booleanos
// Crear un objeto de paginacion para utilizar facil en servicios
// Crear el where final para las queries de database

//https://medium.com/@nurulislamrimon/mastering-dynamic-query-handling-in-nestjs-with-a-powerful-search-filter-pagination-interceptor-3eeb3c7c94e3

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import * as qs from 'qs';
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_OFFSET,
} from '@shared/constants/pagination.constant';

interface IModelMappingsForWhere {}

// searchableFields: Lista de campos que pueden ser buscados por 'searchTerm', e.g ['name', 'email']
// filterableFields: Lista decampos permitidos para filtros directos ['edad', 'isActive, 'createdAt']

// searchTerm - string -> palabra para buscar en los campos de busqueda
// filters -> any key-value pairs para filtros avanzados
@Injectable()
export class SearchFilterAndPaginationInterceptor<
  T extends keyof IModelMappingsForWhere,
> implements NestInterceptor
{
  constructor(
    private readonly searchableFields: Array<keyof IModelMappingsForWhere[T]>,
    private readonly filterableFields: Array<keyof IModelMappingsForWhere[T]>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const originalUrl = request.url;
    const queryStr = originalUrl.split('?')[1] ?? '';
    const parsedQuery = qs.parse(queryStr);

    console.log(parsedQuery);

    const {
      searchTerm,
      offset = DEFAULT_PAGINATION_OFFSET,
      limit = DEFAULT_PAGINATION_LIMIT,
      sortBy,
      sortOrder,
      ...filterQuery
    } = parsedQuery;

    // 	 select: ['age', 'price', 'name'] or ['all']
    //   offset: '2',
    //   limit: '5',
    //   sortBy: 'name', <- sortFields e.g ['age', 'price', 'name']
    //   sortOrder: 'asc', <- sortOrder 'ASC' | 'DESC'
    // LHS Brackets -> eq, like, ilike, gt, lt, before: date, after: date
    //   isActive: {eq: 'true'},
    //   age: { gt: '25' }
    //	 age: {lt: '25'}
    // 	 age: {like: 'a'}
    // 	 age: {eq: '25'}

    // }

    // "/api/v1/employees/a?searchTerm=john&page=2&limit=5&sortBy=name&sortOrder=asc&is_active=true&age[gt]=25"

    return next.handle();
  }
}
