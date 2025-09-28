import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortOrder } from "@/store/slices/sortSlice";
import { RootState, AppDispatch } from "@/store/store";

const Sort: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sortOrder = useSelector((state: RootState) => state.sort.sortOrder);

  return (
    <select
      value={sortOrder || ""}
      onChange={(e) =>
        dispatch(setSortOrder(e.target.value as "asc" | "desc" | null))
      }
      className="border p-2 rounded"
    >
      <option value="">Default</option>
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>
  );
};

export default Sort;
