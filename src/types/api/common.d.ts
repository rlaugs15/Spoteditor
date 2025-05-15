type Sort = 'popular' | 'latest';

export type ApiResponse<T> = {
  data: T;
  meta?: {
    pagination?: {
      currentPage: number;
      pageSize: number;
      totalPages: number;
      sort?: Sort;
    };
    httpStatus?: number;
  };
};

export interface PaginationParams {
  currentPage: number;
  pageSize: number;
  sort?: Sort;
}
