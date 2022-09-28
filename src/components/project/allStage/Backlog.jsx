import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addProjectModal,
  emptyProject
} from "../../../features/modal/modalSlice";
import { useGetProjectsByStageQuery } from "../../../features/projects/projectsApi";
import Error from "../../ui/Error";
import Card from "../Card";

export default function Backlog() {
  const [modalId, setModalId] = useState("");
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const dispatch = useDispatch();

  const { data, isLoading, isError, isSuccess } =
    useGetProjectsByStageQuery("backlog");

  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <Error message="Failed to Fetch Backlog Projects" />;
  } else if (isSuccess && !isLoading && data?.length === 0) {
    content = <div>No Project Found</div>;
  } else if (isSuccess && !isLoading && data?.length > 0) {
    content = data.map((project) => {
      return (
        <Card
          project={project}
          key={project.id}
          teamName={project.teamName}
          description={project.description}
          color={project.color}
          date={project.date}
          isEditable
          onClick={() => {
            setModalId((prevState) =>
              prevState === project?.id ? "" : project?.id
            );
            setCardModalOpen((prevState) =>
              prevState === project?.id ? false : true
            );
          }}
          open={modalId === project?.id && cardModalOpen}
          setOpen={setCardModalOpen}
        />
      );
    });
  }

  return (
    <div className="flex flex-col w-72">
      <div className="flex items-center h-10 px-2 w-72">
        <span className="block text-sm font-semibold">Backlog</span>
        <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
          {data?.length || 0}
        </span>
        <button
          onClick={() => {
            dispatch(addProjectModal(true));
            dispatch(emptyProject());
          }}
          className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex flex-col pb-2 overflow-auto">{content}</div>
    </div>
  );
}
