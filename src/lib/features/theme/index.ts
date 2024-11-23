// src/lib/features/themeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  theme: "light" | "dark";
  lang: "en" | "tr";
}

const initialState: ThemeState = {
  theme: (localStorage.getItem("theme") as "light" | "dark") || "light",
  lang: (localStorage.getItem("lang") as "en" | "tr") || "tr",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    changeLanguage: (state, action: PayloadAction<"en" | "tr">) => {
      state.lang = action.payload;
    },
  },
});

export const { changeTheme, changeLanguage } = themeSlice.actions;

export const selectTheme = (state: { theme: ThemeState }) => state.theme.theme;
export const selectLanguage = (state: { theme: ThemeState }) =>
  state.theme.lang;

export default themeSlice.reducer;
