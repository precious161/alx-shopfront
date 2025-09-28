import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CategoryState {
  selected: string | null;
}

const initialState: CategoryState = {
  selected: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.selected = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
export const selectCategory = (state: RootState) => state.category.selected;
export default categorySlice.reducer;
