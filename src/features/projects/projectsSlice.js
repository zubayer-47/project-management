import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selected: undefined,
  fullTaskSelect: undefined,
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    selectedTask: (state, action) => {
      state.selected = action.payload
    },
    fullTaskSelected: (state, action) => {
      state.fullTaskSelect = action.payload
    },
    updateAssings: (state, action) => {
      state.selected.assigns = action.payload
    },
  },
})

export const { selectedTask, fullTaskSelected, updateAssings } = projectsSlice.actions
export default projectsSlice.reducer
