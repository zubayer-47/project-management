import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddModal: false,
  cardModal: true,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    addModal(state) {
      state.isAddModal = !state.isAddModal;
    },
    setCardModal(state) {
      state.cardModal = !state.cardModal;
    },
  },
});

export default modalSlice.reducer;
export const {addModal,setCardModal} = modalSlice.actions