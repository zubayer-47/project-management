import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addModal, setModalData } from "../features/modal/modalSlice";
import TeamModal from "./Team/TeamModal";

export default function TeamCardModal({ handleAdd, team }) {
  const {isAddModal} = useSelector(state => state.modal)

  const dispatch = useDispatch()

  return (
    <>
      <ul className="absolute right-7 top-8 bg-slate-200 shadow-md text-center z-10">
        <li
          className="text-sm border-b border-b-slate-100 px-7 py-1"
          onClick={handleAdd}
        >
          Add User
        </li>
        <li className="text-sm px-7 py-1" onClick={() => {
          dispatch(addModal())
          dispatch(setModalData(team))
        }}>
          Edit Team
        </li>
      </ul>

      {/* modals */}
      {isAddModal && <TeamModal />}
    </>
  );
}
