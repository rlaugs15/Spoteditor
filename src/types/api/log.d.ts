import { Tables } from '../supabase';
import { ApiResponse, PaginationParams } from './common';

type User = Pick<Tables<'users'>, 'nickname' | 'image_url'>;

type Log = Pick<Tables<'log'>, 'log_id' | 'title' | 'description' | 'thumbnail_url'>;

type Address = Pick<Tables<'address'>, 'city' | 'country' | 'sigungu'>;

type LogWithUser = Log & {
  users: User;
  address: Address;
};

export type LogReseponse = ApiResponse<LogWithUser[]>;

export interface logBookmarkListParmas extends PaginationParams {
  userId: string;
}

export interface LogBookmarkCheckParams {
  logId: string;
  isBookmark: boolean;
}

export interface LogBookmarkParams {
  userId: string;
  currentPage: number;
  pageSize: number;
}
