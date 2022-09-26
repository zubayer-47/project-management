import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  team: [],
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    getTeam(state, action) {
      state.team = action.payload;
    },
  },
});

export const { getTeam } = teamSlice.actions;
export default teamSlice.reducer;
