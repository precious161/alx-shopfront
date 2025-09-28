import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  selectProducts,
  selectLoading,
  selectError,
} from "@/store/slices/productsSlice";
import ProductCard from "@/components/ProductCard";
import Filter from "@/components/Filter";
import Sort from "@/components/Sort";
import Pagination from "@/components/Pagination";
import { AppDispatch, RootState } from "@/store/store";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selected
  );
  const sortOrder = useSelector((state: RootState) => state.sort.sortOrder);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filtering
  let filteredProducts = [...products];
  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === selectedCategory
    );
  }

  // Sorting
  if (sortOrder) {
    filteredProducts.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Filter categories={categories} />
        <Sort />
      </div>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Home;
