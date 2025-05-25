import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { RefObject, useEffect, useState } from 'react';

export default function useQueryPagination(
  queryKey = 'page',
  initialPage = 1,
  scrollTargetRef?: RefObject<HTMLElement | null>
) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageParam = Number(searchParams.get(queryKey)) || initialPage;
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [isClickedPagination, setIsClickedPagination] = useState(false);

  useEffect(() => {
    if (isClickedPagination) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set(queryKey, String(currentPage));

      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
      scrollTargetRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage, isClickedPagination, pathname, router, searchParams, scrollTargetRef]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setIsClickedPagination(true);
  };

  return { currentPage, handlePageChange };
}
