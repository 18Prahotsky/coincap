import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResponsivePagination from "react-responsive-pagination";
import "bootstrap/dist/css/bootstrap.css";

interface PaginationListProps {
  totalPages: number;
  getCurrencyList: (data: number) => void;
}

function PaginationList({ totalPages, getCurrencyList }: PaginationListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  function handlePageChange(page: number) {
    setCurrentPage(page);
    getCurrencyList(page);
    navigate(`/coinlist/${page}`, { replace: true });
  }

  return (
    <ResponsivePagination
      total={totalPages}
      current={currentPage}
      onPageChange={(page) => handlePageChange(page)}
    />
  );
}

export default PaginationList;
