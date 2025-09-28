import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {pages.map((p) => (
        <button
          key={p}
          className={`px-3 py-1 rounded ${
            p === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
          } hover:bg-blue-400 transition`}
          onClick={() => setCurrentPage(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
