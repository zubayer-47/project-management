import React from "react";
import { useSelector } from "react-redux";
import Nav from "../components/Nav";
import Project from "../components/project/Project";
import Error from '../components/ui/Error';
import { useGetProjectsByStageQuery } from "../features/projects/projectsApi";

export default function Projects() {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, isError, isSuccess } = useGetProjectsByStageQuery({
    stage: "backlog",
    userId: user?.id,
  });

  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>
  } else if (isError) {
    content = <Error message="There is an Error Occurred" />
  } else if (isSuccess && data?.length > 0) {
    
  }

  console.log(data);
  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      <Nav page="projects" />

      <div className="px-10 mt-6">
        <h1 className="text-2xl font-bold">Project Board</h1>
      </div>

      <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
        <Project isAddIcon name="Backlog" totalProject={6} />
        <Project name="Ready" totalProject={3} />
        <Project name="Doing" totalProject={2} />
        <Project name="Review" totalProject={3} />
        <Project name="Blocked" totalProject={1} />
        <Project name="Done" totalProject={3} />
        <div className="flex-shrink-0 w-6"></div>
      </div>
    </div>
  );
}
