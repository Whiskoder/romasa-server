export class ResponsePaginationDto {
  limit: number;
  total: number;
  offset: number;
  next: number | null;
  prev: number;
}
