import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SortState {
  sortOrder: "asc" | "desc" | null;
}

const initialState: SortState = { sortOrder: null };

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortOrder: (state, action: PayloadAction<"asc" | "desc" | null>) => {
      state.sortOrder = action.payload;
    },
  },
});

export const { setSortOrder } = sortSlice.actions;
export default sortSlice.reducer;
