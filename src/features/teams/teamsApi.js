import { apiSlice } from '../api/apiSlice'

export const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeamsAll: builder.query({
      query: () => {
        return `/teams?&_sort=createdAt&_order=desc`
      },
    }),
    getTeams: builder.query({
      query: (email) => {
        return `/teams?q=${email}&_sort=createdAt&_order=desc`
      },
    }),
    createTeam: builder.mutation({
      query: (data) => {
        return {
          url: '/teams',
          method: 'POST',
          body: data,
        }
      },
    }),
    deleteTeam: builder.mutation({
      query: (id) => {
        return {
          url: `/teams/${id}`,
          method: 'delete',
        }
      },
    }),
    updateTeam: builder.mutation({
      query: (data) => {
        return {
          url: `/teams/${data.id}`,
          method: 'put',
          body: data,
        }
      },
    }),

    teamExistChecker: builder.query({
      query: (value) => `/teams?type=${value}`,
    }),
  }),
})
export const { useGetTeamsQuery, useCreateTeamMutation, useGetTeamsAllQuery } = teamsApi
