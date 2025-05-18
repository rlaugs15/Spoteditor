import { Pagination } from '@supabase/supabase-js';
import { ApiResponse, LogWithUserAndAddress } from './common';

export interface SearchParams extends Pagination {
  keyword?: string; // 제목/장소명 검색용
  city?: string; // 예: '서울'
  sigungu?: string; // 예: '강남구'
}

export type SearchReseponse = ApiResponse<LogWithUserAndAddress[]>;
