import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@/store/productsSlice";
import type { RootState, AppDispatch } from "@/store/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {items.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow-sm">
          <img
            src={product.image}
            alt={product.title}
            className="h-40 mx-auto"
          />
          <h2 className="font-semibold mt-2">{product.title}</h2>
          <p className="text-gray-600">${product.price}</p>
        </div>
      ))}
    </main>
  );
}
