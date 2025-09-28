import React from "react";
import { Product } from "@/types/product";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="border rounded p-4 flex flex-col justify-between hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-contain mb-2"
      />
      <h3 className="font-semibold">{product.title}</h3>
      <p className="text-gray-700">${product.price}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(addToCart(product));
        }}
        className="bg-blue-500 text-white py-1 px-3 rounded mt-2 hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
