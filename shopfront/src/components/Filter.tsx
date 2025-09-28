import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, selectCategory } from "@/store/slices/categorySlice";
import { AppDispatch } from "@/store/store";

interface Props {
  categories: string[];
}

const Filter: React.FC<Props> = ({ categories }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCategory = useSelector(selectCategory);

  return (
    <select
      className="p-2 border rounded w-full sm:w-48"
      value={selectedCategory || ""}
      onChange={(e) => dispatch(setCategory(e.target.value || null))}
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
};

export default Filter;
