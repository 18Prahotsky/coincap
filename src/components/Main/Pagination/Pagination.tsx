import { useSearchParams } from "react-router-dom";
import ResponsivePagination from "react-responsive-pagination";
import "bootstrap/dist/css/bootstrap.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const [_, setSearchParams] = useSearchParams();

  function handlePageChange(page: number) {
    setSearchParams({ page: page.toString() });
  }

  return (
    <ResponsivePagination
      total={totalPages}
      current={currentPage}
      onPageChange={handlePageChange}
    />
  );
}

export default Pagination;
