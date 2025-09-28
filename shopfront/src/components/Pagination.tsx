import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentPage, setPage } from "@/store/slices/paginationSlice";
import { selectProducts } from "@/store/slices/productsSlice";

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const products = useSelector(selectProducts);

  const pageSize = 8; // match with slice or make dynamic
  const totalPages = Math.ceil(products.length / pageSize);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <div className="flex justify-center gap-2 my-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`px-3 py-1 rounded ${
            page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
