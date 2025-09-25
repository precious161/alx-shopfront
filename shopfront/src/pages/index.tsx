import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectProducts,
  selectLoading,
  selectError,
} from "@/store/slices/productsSlice";
import type { AppDispatch } from "@/store/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p className="text-blue-500">Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {products.map((p) => (
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
  );
}
