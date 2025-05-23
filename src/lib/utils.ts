import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* 쿼리키에서 배열 요소를 전부 string으로 안전하게 변환 */
export function stringifyQueryKey(key: readonly (string | number | undefined)[]) {
  return key.map((k) => String(k ?? ''));
}
