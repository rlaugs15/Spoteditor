import { Tables } from '../supabase';
import { PaginationParams } from './common';

export type LogReseponse = ApiResponse<Tables<'log'>>;

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
