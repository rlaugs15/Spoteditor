import { ApiResponse, LogWithUserAndAddress, PaginationParams } from './common';

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
