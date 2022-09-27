import { apiSlice } from "../api/apiSlice";

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjectsByStage: builder.query({
        query: ({stage, userId}) => `/projects?stage=${stage}&members_like=${userId}`
    })
  }),
});

export const {
    useGetProjectsByStageQuery
} = projectApi;
