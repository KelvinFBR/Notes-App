import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { noteSlice } from "./slices/notes";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notes: noteSlice.reducer,
  },
});
