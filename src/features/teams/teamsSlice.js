import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  team: undefined,
}

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    selectedTeam: (state, action) => {
      state.team = action.payload
    },
    updateAssings: (state, action) => {
      state.selected.assigns = action.payload
    },
  },
})

export const { selectedTeam, updateAssings } = teamsSlice.actions
export default teamsSlice.reducer
