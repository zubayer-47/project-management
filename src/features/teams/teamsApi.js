import { apiSlice } from "../api/apiSlice";

export const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (userId) => `/teams?users_like=${userId}`,
    }),
    getTeam: builder.query({
      query: (teamName) => `/teams?name=${teamName}`
    }),
    createTeam: builder.mutation({
      query: ({ userId, data }) => ({
        url: "/teams",
        method: "POST",
        body: {
          ...data,
          users: [userId],
        },
      }),
      async onQueryStarted({ userId, data }, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getTeams", userId, (draftTeams) => {
              const index = draftTeams.findIndex(
                (team) => team.id != data.userId
              );
// modify
              if (index !== -1) {
                draftTeams.push(response.data);
              }
            })
          );
        } catch (error) {}
      },
    }),
    addUser: builder.mutation({
      query: ({ teamId, users }) => ({
        url: `/teams/${teamId}`,
        method: "PATCH",
        body: { users },
      }),
    }),

    addTeamToUser: builder.mutation({
      query: ({ teams, userId }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: { teams },
      }),
    }),

    checkUserExist: builder.query({
      query: (email) => `/users?email_like=${email}`,
    }),

    updateTeam: builder.mutation({
      query: ({ teamId, data }) => ({
        url: `/teams/${teamId}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        const { user } = getState()?.auth;

        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getTeams", user?.id, (draft) => {
            const team = draft.find((t) => t.id == arg.teamId);

            if (team?.id) {
              team.name = arg.data.name;
              team.color = arg.data.color;
              team.description = arg.data.description;
              team.date = arg.data.date;
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useAddUserMutation,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useCheckUserExistQuery,
  useAddTeamToUserMutation,
} = teamsApi;
