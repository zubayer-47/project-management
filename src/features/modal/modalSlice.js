import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddModal: false,
  cardModal: false,
  data: {}
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    addModal(state, action) {
      state.isAddModal = action.payload;
    },
    setCardModal(state) {
      state.cardModal = !state.cardModal;
    },
    setModalData(state, action) {
      state.data = action.payload;
    }
  },
});

export default modalSlice.reducer;
export const {addModal,setCardModal, setModalData} = modalSlice.actions