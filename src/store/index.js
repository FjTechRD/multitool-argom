import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice.slide";
import userReducer from "./slices/userSlice.slide";
import budgetReducer from "./slices/budgetSlice.slide";

export default configureStore({
  reducer: {
    theme: themeReducer,
    users: userReducer,
    budget: budgetReducer,
  },
});