import { apiSlice } from "../api/apiSlice";
import { getTeams } from "./teamSlice";

export const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (userId) => `/teams?users_like=${userId}`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(getTeams(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    createTeam: builder.mutation({
      query: (data) => ({
        url: "/teams",
        method: "POST",
        body: data,
      }),
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getTeams",
            arg.data.userId,
            (draftTeams) => {
              const index = draftTeams.findIndex(
                (team) => team.id === arg.data.userId
              );

              if (index !== -1) {
                draftTeams.push(arg.data);
              }
            }
          )
        );

        try {
          await cacheDataLoaded;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
    // addUser: builder.mutation({
    //   query: ({ teamId, user }) => {
    //     // return {
    //     //   url: `/teams?id=${teamId}`,
    //     //   method: "PATCH",
    //     //   // body:
    //     // }
    //   },
    // }),

    updateTeam: builder.mutation({
      query: ({ teamId, data }) => ({
        url: `/teams/${teamId}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        const { user } = getState()?.auth;
        try {
          const response = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getTeams", user?.id, (draft) => {
              const team = draft.find((t) => t.id == arg.teamId);

              if (team?.id) {
                team.name = response.data.name;
                team.color = response.data.color;
                team.description = response.data.description;
                team.date = response.data.date;
              }
            })
          );
        } catch (error) {
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
} = teamsApi;
