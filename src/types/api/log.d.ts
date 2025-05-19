import { Tables } from '../supabase';
import { ApiResponse, LogWithUserAndAddress, PaginationParams } from './common';

/* 로그 */
export type DetailLog = Tables<'log'> & {
  place: Array<
    Tables<'place'> & {
      place_images: Tables<'place_images'>[];
    }
  >;
};

export type LogResponse = ApiResponse<DetailLog>;

/* 로그리스트 */
export type LogsReseponse = ApiResponse<LogWithUserAndAddress[]>;

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
