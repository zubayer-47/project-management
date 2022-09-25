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
    addUser: builder.mutation({
      query: ({ teamId, user }) => {

        // return {
        //   url: `/teams?id=${teamId}`,
        //   method: "PATCH",
        //   // body:
        // }
      },
    }),
  }),
});

export const { useGetTeamsQuery, useAddUserMutation, useCreateTeamMutation } = teamsApi;
