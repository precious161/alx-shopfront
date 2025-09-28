import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import categoryReducer from "./slices/categorySlice";
import sortReducer from "./slices/sortSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    category: categoryReducer,
    sort: sortReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
