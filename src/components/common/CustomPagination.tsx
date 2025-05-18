import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

interface CustomPaginationProps {
  currentPage?: number;
  totalPages: number;
  onChangePage: (newPage: number) => void;
}

export default function CustomPagination({
  currentPage,
  totalPages,
  onChangePage,
}: CustomPaginationProps) {
  if (totalPages <= 1 || !currentPage) return null;

  const shouldShowLeftArrow = currentPage >= 3;
  const shouldShowRightArrow = currentPage < totalPages - 2;

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage > totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    if (currentPage > 3 && totalPages - 3) {
      return [currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }
    return [1, 2, 3, '...', totalPages];
  };
  return (
    <Pagination>
      <PaginationContent className="font-untitled text-text-2xs web:text-[13px]">
        {shouldShowLeftArrow && (
          <PaginationItem>
            <PaginationPrevious onClick={() => onChangePage(currentPage - 1)} />
          </PaginationItem>
        )}
        {getPageNumbers().map((page, idx) =>
          Number.isInteger(page) ? (
            <PaginationItem key={idx}>
              <PaginationLink
                onClick={() => onChangePage(Number(page))}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationEllipsis key={idx} />
          )
        )}
        {shouldShowRightArrow && (
          <PaginationItem>
            <PaginationNext onClick={() => onChangePage(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
