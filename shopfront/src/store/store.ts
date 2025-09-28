import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import categoryReducer from "./slices/categorySlice";
import sortReducer from "./slices/sortSlice";
import paginationReducer from "./slices/paginationSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    category: categoryReducer,
    sort: sortReducer,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
