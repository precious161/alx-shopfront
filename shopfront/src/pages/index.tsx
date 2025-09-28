import React, { useEffect } from "react";
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
import Pagination from "@/components/Pagination"; // new
import { AppDispatch, RootState } from "@/store/store";
import {
  selectCurrentPage,
  selectPageSize,
} from "@/store/slices/paginationSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const selectedCategory = useSelector(
    (state: RootState) => state.category.selected
  );
  const sortOrder = useSelector((state: RootState) => state.sort.sortOrder);
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter products by category
  let filteredProducts = [...products];
  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === selectedCategory
    );
  }

  // Sort products
  if (sortOrder) {
    filteredProducts.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }

  // Pagination
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="p-8">
      <div className="flex gap-4 mb-4">
        <Filter categories={categories} />
        <Sort />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination />
    </div>
  );
};

export default Home;
