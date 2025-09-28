import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PaginationState {
  currentPage: number;
  pageSize: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  pageSize: 8, // or any default number of products per page
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
  },
});

export const { setPage, setPageSize } = paginationSlice.actions;
export const selectCurrentPage = (state: RootState) =>
  state.pagination.currentPage;
export const selectPageSize = (state: RootState) => state.pagination.pageSize;
export default paginationSlice.reducer;
