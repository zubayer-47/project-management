import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isTeamModalOpen: false,
  isProjectModalOpen: false,
  cardModal: false,
  data: {},
  project: undefined,
  isProjectEmpty: true,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    addTeamModal(state, action) {
      console.log(action.payload)
      state.isTeamModalOpen = action.payload;
    },
    addProjectModal(state, action) {
      state.isProjectModalOpen = action.payload;
    },
    setCardModal(state) {
      state.cardModal = !state.cardModal;
    },
    setModalData(state, action) {
      state.data = action.payload;
    },
    addProject(state, action) {
      state.project = action.payload;
      state.isProjectEmpty = false;
    },
    emptyProject(state, action) {
      state.project = undefined;
      state.isProjectEmpty = true;
    },
  },
});

export default modalSlice.reducer;
export const {
  addTeamModal,
  addProjectModal,
  setCardModal,
  setModalData,
  addProject,
  emptyProject,
} = modalSlice.actions;
