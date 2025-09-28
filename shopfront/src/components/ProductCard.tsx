import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-64 mb-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
      <p className="text-gray-600 mb-2">${product.price}</p>
      <p className="text-sm text-gray-500 line-clamp-2">
        {product.description}
      </p>
    </div>
  );
};

export default ProductCard;
