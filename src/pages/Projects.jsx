import React from "react";
import { useSelector } from "react-redux";
import Nav from "../components/Nav";
import Stages from "../components/project/allStage";
import { useGetProjectsByStageQuery } from "../features/projects/projectsApi";

export default function Projects() {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, isError, isSuccess } = useGetProjectsByStageQuery({
    stage: "backlog",
    userId: user?.id,
  });

  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      <Nav page="projects" />

      <div className="px-10 mt-6">
        <h1 className="text-2xl font-bold">Project Board</h1>
      </div>

      <Stages />
    </div>
  );
}
