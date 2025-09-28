// src/components/Sort.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortOrder } from "@/store/slices/sortSlice";
import { AppDispatch, RootState } from "@/store/store";

const Sort: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sortOrder = useSelector((state: RootState) => state.sort.sortOrder);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "asc" | "desc" | "";
    dispatch(setSortOrder(value === "" ? null : value));
  };

  return (
    <select
      value={sortOrder ?? ""}
      onChange={handleChange}
      className="border p-2 rounded"
    >
      <option value="">Default</option>
      <option value="asc">Price: Low → High</option>
      <option value="desc">Price: High → Low</option>
    </select>
  );
};

export default Sort;
