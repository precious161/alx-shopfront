import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectProducts,
  selectLoading,
  selectError,
} from "@/store/slices/productsSlice";
import { AppDispatch } from "@/store/store";
import { setCategory, selectCategory } from "@/store/slices/categorySlice";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const selectedCategory = useSelector(selectCategory);

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Derive categories dynamically
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Filter products by category
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  if (loading) return <p className="text-blue-500">Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      {/* Category Dropdown */}
      <div className="mb-4">
        <select
          className="border px-3 py-2 rounded"
          value={selectedCategory ?? ""}
          onChange={(e) => dispatch(setCategory(e.target.value || null))}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="border p-4 rounded-lg shadow-md flex flex-col items-center"
          >
            <img
              src={p.image}
              alt={p.title}
              className="w-32 h-32 object-contain mb-2"
            />
            <h2 className="text-lg font-bold text-center">{p.title}</h2>
            <p className="text-green-600 font-semibold">${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
