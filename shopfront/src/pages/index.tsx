import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectProducts,
  selectLoading,
  selectError,
} from "@/store/slices/productsSlice";
import ProductCard from "@/components/ProductCard";
import Filter from "@/components/Filter";
import Sort from "@/components/Sort";
import Search from "@/components/Search";
import { AppDispatch, RootState } from "@/store/store";
import { Product } from "@/types/product";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selected
  );
  const sortOrder = useSelector((state: RootState) => state.sort.sortOrder);
  const searchQuery = useSelector((state: RootState) => state.search.query);

  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - 50
    ) {
      setVisibleCount((prev) => prev + 8);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let filteredProducts = [...products];

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === selectedCategory
    );
  }

  if (searchQuery) {
    filteredProducts = filteredProducts.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (sortOrder) {
    filteredProducts.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Search />
        <Filter categories={categories} />
        <Sort />
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse bg-gray-200 h-64 rounded"
            ></div>
          ))}
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded w-96 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2"
            >
              X
            </button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="w-full h-64 object-contain mb-2"
            />
            <h2 className="text-xl font-bold">{selectedProduct.title}</h2>
            <p>{selectedProduct.description}</p>
            <p className="font-semibold">${selectedProduct.price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
