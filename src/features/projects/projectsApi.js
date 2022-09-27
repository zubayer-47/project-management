import { apiSlice } from "../api/apiSlice";

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjectsByStage: builder.query({
      query: ({ stage, userId }) =>
        `/projects?stage=${stage}&members_like=${userId}`,
    }),

    createProject: builder.mutation({
      query: ({ userId, data }) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(
        { stage, userId, data },
        { queryFulfilled, dispatch }
      ) {
        try {
          const response = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              "getProjectsByStage",
              { stage: data.stage, userId },
              (draft) => {
                draft.push(response.data);
              }
            )
          );
        } catch (error) {}
      },
    }),

    updateProject: builder.mutation({
      query: ({ projectId, data, userId }) => ({
        url: `/projects/${projectId}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getProjectsByStage", {
            stage: "backlog",
            userId: arg.userId,
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetProjectsByStageQuery, useUpdateProjectMutation, useCreateProjectMutation } = projectApi;
