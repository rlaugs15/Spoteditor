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

export type ActionResponse = {
  success: boolean;
  msg?: string;
};

export interface PaginationParams {
  currentPage: number;
  pageSize: number;
  sort?: Sort;
}

export interface BookmarkResponse {
  success: boolean;
  isBookmark: boolean;
  msg?: string;
}
