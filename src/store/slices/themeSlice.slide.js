// src/store/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getPreferredTheme = () => {
  const userPrefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return userPrefersDark ? "dark" : "light";
};

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: "auto", // 'light', 'dark', or 'auto'
    currentTheme: getPreferredTheme(),
  },
  reducers: {
    setThemeMode: (state, action) => {
      state.mode = action.payload;
      state.currentTheme =
        action.payload === "auto" ? getPreferredTheme() : action.payload;
    },
  },
});

export const { setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;
