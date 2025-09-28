// src/components/Filter.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, selectCategory } from "@/store/slices/categorySlice";
import { AppDispatch, RootState } from "@/store/store";

interface FilterProps {
  categories: string[];
}

const Filter: React.FC<FilterProps> = ({ categories }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selected
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(setCategory(value === "" ? null : value));
  };

  return (
    <select
      value={selectedCategory ?? ""}
      onChange={handleChange}
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
