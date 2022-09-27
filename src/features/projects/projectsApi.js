import { apiSlice } from "../api/apiSlice";

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjectsByStage: builder.query({
      query: ({ stage }) => `/projects?stage=${stage}`,
    }),

    createProject: builder.mutation({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              "getProjectsByStage",
              { stage: "backlog" },
              (draft) => {
                draft.push(response.data);
              }
            )
          );
        } catch (error) {}
      },
    }),

    updateProject: builder.mutation({
      query: ({ projectId, data }) => ({
        url: `/projects/${projectId}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted({ projectId, data }, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getProjectsByStage",
            {
              stage: "backlog",
            },
            (draft) => {
              const oldProject = draft.find(
                (project) => project.id == projectId
              );

              if (oldProject?.id) {
                oldProject.name = data?.name;
                oldProject.description = data?.description;
                oldProject.date = data?.date;
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),

    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `/projects/${projectId}`,
        method: "DELETE",
      }),

      async onQueryStarted(projectId, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getProjectsByStage", {
            stage: "backlog",
          }),
          (draft) => {
            return draft.filter((p) => {
              console.log(p.id == projectId);
              return p.id == projectId;
            });
          }
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

export const {
  useGetProjectsByStageQuery,
  useUpdateProjectMutation,
  useCreateProjectMutation,
} = projectApi;
