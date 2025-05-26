import { ApiResponse, LogWithUserAndAddress, PaginationParams } from './common';

export interface SearchParams extends PaginationParams {
  keyword?: string; // 제목/장소명 검색용
  city?: string; // 예: '서울'
  sigungu?: string; // 예: '강남구'
}

export type SearchReseponse = ApiResponse<LogWithUserAndAddress[]>;
