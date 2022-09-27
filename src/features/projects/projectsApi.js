/* eslint-disable eqeqeq */
import { apiSlice } from '../api/apiSlice'
import _ from 'lodash'
export const projectsApi = apiSlice.injectEndpoints({
  tagTypes: ['getProjects'],
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (email) => `/projects?&q=${email}&_sort=createdAt&_order=desc`,
      transformResponse: (response, meta, arg) => {
        const myIssuesTask = response.filter((curr) => {
          const sucsessGood = {
            ...curr,
            items: curr.items.filter((docs) => {
              const checker =
                docs?.assigns?.length > 0 && docs?.assigns[0]?.split('-')?.length > 1
                  ? docs?.assigns[0]?.split('-')
                  : docs?.assigns
              if (checker?.length > 0) {
                const success = checker.includes(arg.trim())
                return success
              }
              return false
            }),
          }
          return sucsessGood
        })
        let data = [
          { id: null, name: 'backlog', items: [], by: null },
          { id: null, name: 'ready', items: [], by: null },
          { id: null, name: 'doing', items: [], by: null },
          { id: null, name: 'review', items: [], by: null },
          { id: null, name: 'blocked', items: [], by: null },
          { id: null, name: 'done', items: [], by: null },
        ]
        // eslint-disable-next-line array-callback-return
        myIssuesTask.filter((task, i, arr) => {
          if (task?.name?.toLowerCase() == 'backlog') {
            const index = _.findIndex(arr, { name: 'backlog' })
            if (index !== -1) {
              data[index] = {
                ...task,
                items: _.concat(data[index].items, task?.items),
                id: task.id,
                by: task.by,
              }
            }
          } else if (task?.name?.toLowerCase() == 'ready') {
            const index = _.findIndex(arr, { name: 'ready' })
            if (index !== -1) {
              data[index] = {
                ...task,
                items: _.concat(data[index].items, task?.items),
                id: task.id,
                by: task.by,
              }
            }
          } else if (task?.name?.toLowerCase() == 'doing') {
            const index = _.findIndex(arr, { name: 'doing' })
            if (index !== -1) {
              data[index] = {
                ...task,
                items: _.concat(data[index].items, task?.items),
                id: task.id,
                by: task.by,
              }
            }
          } else if (task?.name?.toLowerCase() == 'review') {
            const index = _.findIndex(arr, { name: 'review' })
            if (index !== -1) {
              data[index] = {
                ...task,
                items: _.concat(data[index].items, task?.items),
                id: task.id,
                by: task.by,
              }
            }
          } else if (task?.name?.toLowerCase() == 'blocked') {
            const index = _.findIndex(arr, { name: 'blocked' })
            if (index !== -1) {
              data[index] = {
                ...task,
                items: _.concat(data[index].items, task?.items),
                id: task.id,
                by: task.by,
              }
            }
          } else if (task?.name?.toLowerCase() == 'done') {
            const index = _.findIndex(arr, { name: 'done' })
            if (index !== -1) {
              data[index] = {
                ...task,
                items: _.concat(data[index].items, task?.items),
                id: task.id,
                by: task.by,
              }
            }
          }
        })
        //eslint-disable-next-line array-callback-return
        return data
      },
      providesTags: ['getProjects'],
    }),
    createProjects: builder.mutation({
      query: (data) => {
        return {
          url: `/projects`,
          method: 'POST',
          body: data,
        }
      },
    }),
    updateProject: builder.mutation({
      query: (data) => {
        return {
          url: `/projects/${data.id}`,
          method: 'PUT',
          body: { items: _.uniqWith(data.items, _.isEqual), name: data.name, by: data.by },
        }
      },
    }),
  }),
})
export const {
  useGetProjectsQuery,
  useUpdateProjectsMutation,
  useCreateProjectsMutation,
  useExistCheckerQuery,
} = projectsApi
