import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortOrder } from "@/store/slices/sortSlice";
import { AppDispatch, RootState } from "@/store/store";

const Sort: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sortOrder = useSelector((state: RootState) => state.sort.sortOrder);

  return (
    <select
      className="p-2 border rounded w-full sm:w-48"
      value={sortOrder || ""}
      onChange={(e) =>
        dispatch(setSortOrder(e.target.value as "asc" | "desc" | null))
      }
    >
      <option value="">Sort by Price</option>
      <option value="asc">Low to High</option>
      <option value="desc">High to Low</option>
    </select>
  );
};

export default Sort;
