export interface TypeOrmPaginator<T> {
  data: T[];
  page: number;
  limit: number;
  lastPage: number;
  total: number;
}

export interface BaseHttpResponse<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers: any;
  data: T;
}
