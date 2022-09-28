import React from "react";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { useGetProjectsByStageQuery } from "../../../features/projects/projectsApi";
import Error from "../../ui/Error";
import Card from "../Card";

export default function Done() {
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading, isError, isSuccess } = useGetProjectsByStageQuery("done");

  const [{ item, isOver }, drop] = useDrop(() => ({
    accept: "stages",
    collect: (monitor) => ({
      isOver: monitor.canDrop(),
      item: monitor.getItem(),
    }),
  }));
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
          key={project.id}
          teamName={project.teamName}
          description={project.description}
          color={project.color}
          date={project.date}
        />
      );
    });
  }
  return (
    <div className="flex flex-col w-72" ref={drop}>
      <div className="flex items-center flex-shrink-0 h-10 px-2 w-72">
        <span className="block text-sm font-semibold">Done</span>
        <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
          {data?.length || 0}
        </span>
      </div>
      <div className="flex flex-col pb-2 overflow-auto">{content}</div>
    </div>
  );
}
