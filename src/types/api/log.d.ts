import { Tables } from '../supabase';
import { PaginationParams } from './common';

export type LogReseponse = ApiResponse<Tables<'log'>>;

export interface logBookmarkListParmas extends PaginationParams {
  userId: string;
}

export interface LogBookmarkParams {
  logId: string;
  isBookmark: boolean;
}
