import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_URL,
  prepareHeaders: async (headers, { getState }) => {
    const token = getState()?.auth?.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (arg, api, extraOptions) => {
    try {
      const result = await baseQuery(arg, api, extraOptions);

      if (result?.error?.status === 401) {
        api.dispatch(logout());
        localStorage.clear();
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  endpoints: (builder) => ({}),
});
