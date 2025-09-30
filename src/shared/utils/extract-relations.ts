// import { PaginationDto } from '@shared/dto/pagination.dto';

// export const extractRelations = <T>(
//   dtoInstance: any,
//   relationsMap: Record<string, string>,
// ): T[] => {
//   const relations = Object.entries(dtoInstance)
//     .filter(([key, value]) => value === true && key in relationsMap)
//     .map(([key, value]) => relationsMap[key]);
//   return relations as T[];
// };

// export const splitQuery = <T>(
//   query: Object,
//   relationsMap: Record<string, string>,
// ): { relations: T[]; paginationDto: PaginationDto } => {
//   const relations = extractRelations<T>(query, relationsMap);
//   const limit = query['limit'];
//   const offset = query['offset'];
//   const paginationDto = { limit, offset };
//   return { relations, paginationDto };
// };
