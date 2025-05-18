import { Tables } from '../supabase';

type Sort = 'popular' | 'latest';

export type NullableFields<T> = {
  [K in keyof T]: T[K] | null;
};

export type ApiResponse<T> = {
  data: T;
  success: boolean;
  meta?: {
    pagination?: {
      currentPage: number;
      pageSize: number;
      totalPages: number;
      totalItems: number;
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
  pageSize?: number;
  sort?: Sort;
}

export interface BookmarkResponse {
  success: boolean;
  isBookmark: boolean;
  msg?: string;
}

export interface BookmarkParams extends Pick<PaginationParams, 'currentPage' | 'pageSize'> {
  userId: string;
}

/* 검색, 로그 응답에 사용되는 공통 타입 */
export type User = Pick<Tables<'users'>, 'nickname' | 'user_id'> | null;
export type Address = Pick<Tables<'address'>, 'city' | 'country' | 'sigungu'>;
export type Log = Omit<Tables<'log'>, 'created_at' | 'user_id'>;
export type LogWithUserAndAddress =
  | (Log & {
      users: User;
      address: Address[];
    })
  | null;
