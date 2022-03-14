/*
For interacting with spring boot REST API
 */
export interface PageableResponse<T> {
  content: T[];
  last?: boolean;
  totalPages?: number;
  totalElements?: number;
  size?: number;
  first?: boolean;
  numberElements?: number;
  empty?: boolean;
  sort?: BackendSort;
  pageable?: BackendPageable;
}

export interface BackendSort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface BackendPageable {
  sort: BackendSort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PageableRequestParams {
  page?: number;
  size?: number;
  sort?: number;
}
