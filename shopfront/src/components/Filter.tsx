import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, selectCategory } from "@/store/slices/categorySlice";
import { AppDispatch, RootState } from "@/store/store";

interface FilterProps {
  categories: string[];
}

const Filter: React.FC<FilterProps> = ({ categories }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCategory = useSelector(selectCategory);

  return (
    <select
      value={selectedCategory || ""}
      onChange={(e) => dispatch(setCategory(e.target.value || null))}
      className="border p-2 rounded"
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
