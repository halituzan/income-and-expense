import { configureStore } from "@reduxjs/toolkit";
import expenditureSlice from "./features/expenditure";
import categorySlice from "./features/categories";
import themeSlice from "./features/theme"
export const makeStore = () => {
  return configureStore({
    reducer: {
      expenditure: expenditureSlice,
      theme: themeSlice,
      category: categorySlice
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];