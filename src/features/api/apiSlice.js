import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
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
        console.log("clearing");
        localStorage.clear();
      } else {
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  },
  endpoints: (builder) => ({}),
});
