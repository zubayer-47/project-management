import { apiSlice } from "../api/apiSlice";
import { login } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );

          console.log(localStorage.getItem("auth"), "storage")

          dispatch(
            login({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
