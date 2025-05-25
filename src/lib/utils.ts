import { QueryClient } from '@tanstack/react-query';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* 쿼리키에서 배열 요소를 전부 string으로 안전하게 변환 */
export function stringifyQueryKey(key: readonly (string | number | undefined)[]) {
  return key.map((k) =>
    typeof k === 'string' ? `s:${k}` : typeof k === 'number' ? `n:${k}` : 'u:'
  );
}

/* URLSearchParams로 변환해 API 요청용 쿼리스트링(query string) 으로 만들어주는 유틸 함수 */
export function toQueryString(params: Record<string, any>): string {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.set(key, String(value));
    }
  });

  return query.toString();
}

export function getQueryClient() {
  return new QueryClient();
}
