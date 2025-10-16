import { ResponsePaginationDto } from 'src/core/dto/response-pagination.dto';

export const createPagination = (
  total: number,
  limit: number,
  offset: number,
): ResponsePaginationDto => {
  const next = (): number | null => {
    const nextOffset = offset + limit;
    return nextOffset < total ? nextOffset : null;
  };

  const prev = (): number => {
    return offset - limit > 0 ? offset - limit : 0;
  };

  return {
    limit,
    total,
    offset,
    next: next(),
    prev: prev(),
  };
};
