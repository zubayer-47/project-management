import { apiSlice } from '../api/apiSlice'
import _ from 'lodash'
import { store } from '../../app/store'
export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (email) => `/users?email=${email}`,
      transformResponse: (response, meta) => {
        let error = {}
        let isOk = false
        let data = {}
        const email = store.getState()?.auth?.user?.email
        const checkerEmail = response?.length > 0
        if (checkerEmail) {
          let isChecking = checkerEmail && _.find(response, { email })
          if (!isChecking) {
            data.statusCode = 200
            data = checkerEmail && { ...data, data: _.omit(response[0], ['password']) }
            isOk = true
          }
          if (isChecking) {
            error.statusCode = 409
            error.error = { message: 'Cannot assign yourself already assigned to you!' }
            isOk = false
          }
        }
        return {
          data: isOk ? data : error,
        }
      },
    }),
    getAssignsUsers: builder.query({
      query: (allAssigns) => {
        let stringAssigns
        if (allAssigns?.length > 0 && allAssigns[0]?.split('-')?.length > 1) {
          stringAssigns = allAssigns[0]
            .split('-')
            .filter((currentItem, i, allItems) => {
              return i === allItems.indexOf(currentItem)
            })
            .join('&email_like=')
          stringAssigns = '&email_like=' + stringAssigns
        } else {
          stringAssigns = '&email_like=' + allAssigns
        }
        if (stringAssigns) {
          return `/users?${stringAssigns}`
        } else {
          return
        }
      },
    }),
  }),
})

export const { useGetUserQuery, useGetAssignsUsersQuery } = usersApi
