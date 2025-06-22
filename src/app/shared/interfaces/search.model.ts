export type SearchPagination<T extends object = object> = {
  [K in keyof T]?: T[K];
} & { pageIndex: number; pageSize: number };
