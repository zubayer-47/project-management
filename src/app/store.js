import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authReducer from "../features/auth/authSlice";
import modalReducer from "../features/modal/modalSlice";
import projectReducer from "../features/projects/projectSlice";
import searchReducer from "../features/search/searchSlice";
import teamReducer from "../features/teams/teamSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    team: teamReducer,
    project: projectReducer,
    auth: authReducer,
    modal: modalReducer,
    search: searchReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
