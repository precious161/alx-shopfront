import React from "react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 w-full object-contain mb-4"
      />
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p className="text-gray-600 text-sm truncate">{product.description}</p>
      <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;
