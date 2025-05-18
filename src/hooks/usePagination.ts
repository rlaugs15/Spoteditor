import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const usePagination = (initialPage = 1) => {
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

      router.push(`${pathname}?${newParams.toString()}`);
    }
  }, [currentPage, isClickedPagination, pathname, router, searchParams]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setIsClickedPagination(true);
  };

  return { currentPage, handlePageChange };
};

export default usePagination;
