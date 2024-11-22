import { configureStore } from "@reduxjs/toolkit";
import expenditureSlice from "./features/expenditure";

export const makeStore = () => {
  return configureStore({
    reducer: {
      expenditure: expenditureSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];