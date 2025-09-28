import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/store/slices/searchSlice";
import { RootState, AppDispatch } from "@/store/store";

const Search: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const query = useSelector((state: RootState) => state.search.query);

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={query}
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      className="border p-2 rounded w-full"
    />
  );
};

export default Search;
