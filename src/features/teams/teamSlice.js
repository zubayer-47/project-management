import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teams: [],
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    getTeams(state, action) {
      state.teams = action.payload;
    },
  },
});

export const { getTeams } = teamSlice.actions;
export default teamSlice.reducer;
