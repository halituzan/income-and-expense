// src/lib/features/themeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  theme: "light" | "dark";
}

const initialState: ThemeState = {
  theme: (localStorage.getItem("theme") as "light" | "dark") || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export const selectTheme = (state: { theme: ThemeState }) => state.theme.theme;

export default themeSlice.reducer;
