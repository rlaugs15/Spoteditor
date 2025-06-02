import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { RefObject, useEffect, useState } from 'react';

const usePagination = (initialPage = 1, scrollTargetRef?: RefObject<HTMLElement | null>) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const pageParam = Number(searchParams.get('currentPage')) || initialPage; // ?page 있으면

  const [currentPage, setCurrentPage] = useState(pageParam);
  const [isClickedPagination, setIsClickedPagination] = useState(false);

  useEffect(() => {
    if (isClickedPagination) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('currentPage', String(currentPage));

      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
      /* 페이지네이션 시 ref가 들어간 태그로 부드럽게 이동 */
      scrollTargetRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage, isClickedPagination, pathname, router, searchParams, scrollTargetRef]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setIsClickedPagination(true);
  };

  return { currentPage, handlePageChange };
};

export default usePagination;
