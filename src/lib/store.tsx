import { configureStore } from "@reduxjs/toolkit";
import expenditureSlice from "./features/expenditure";
import themeSlice from "./features/theme"
export const makeStore = () => {
  return configureStore({
    reducer: {
      expenditure: expenditureSlice,
      theme: themeSlice
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];