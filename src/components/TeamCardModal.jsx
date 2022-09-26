import React from "react";
import { useDispatch } from "react-redux";
import { addModal, setCardModal, setModalData } from "../features/modal/modalSlice";
import { getTeam } from "../features/teams/teamSlice";

export default function TeamCardModal({ setOpen, team }) {

  const dispatch = useDispatch();

  return (
    <>
      <ul className="absolute right-7 top-8 bg-slate-200 shadow-md text-center z-10">
        <li
          className="text-sm border-b border-b-slate-100 px-7 py-1"
          onClick={() => {
            setOpen(false)
            dispatch(setCardModal())
            dispatch(getTeam(team))
          }}
        >
          Add User
        </li>
        <li
          className="text-sm px-7 py-1"
          onClick={() => {
            dispatch(addModal(true));
            dispatch(setModalData(team));
            setOpen(false)
          }}
        >
          Edit Team
        </li>
      </ul>
    </>
  );
}
