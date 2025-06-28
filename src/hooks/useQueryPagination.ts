'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { RefObject, useEffect, useState } from 'react';

export default function useQueryPagination(
  queryKey = 'page',
  initialPage = 1,
  scrollTargetRef?: RefObject<HTMLElement | null>
) {
  const router = useRouter();
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isClickedPagination, setIsClickedPagination] = useState(false);

  useEffect(() => {
    if (!isClickedPagination) return;

    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set(queryKey, String(currentPage));

    router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });

    scrollTargetRef?.current?.scrollIntoView({ behavior: 'smooth' });

    setIsClickedPagination(false); // 다음 클릭을 위한 초기화
  }, [isClickedPagination, currentPage, pathname, router, queryKey, scrollTargetRef]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setIsClickedPagination(true);
  };

  return { currentPage, handlePageChange };
}
