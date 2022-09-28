import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProjectModal } from "../../features/modal/modalSlice";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation
} from "../../features/projects/projectsApi";
import { teamsApi } from "../../features/teams/teamsApi";
import debounce from "../../utils/debounce";

export default function ProjectModal() {
  const {
    isProjectModalOpen: open,
    project,
    isProjectEmpty,
  } = useSelector((state) => state.modal);
  const { user } = useSelector((state) => state.auth);
  const [projectName, setProjectName] = useState(project?.name || "");
  const [teamNameS, setTeamNameS] = useState(project?.teamName || "");
  const [description, setDescription] = useState(project?.description || "");
  const [teamId, setTeamId] = useState("");
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState(project?.teamName || "");
  const [disabled, setDisabled] = useState(false);

  const [updateProject] = useUpdateProjectMutation();
  const [createProject] = useCreateProjectMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (teamNameS) {
      (async () => {
        try {
          const response = await dispatch(
            teamsApi.endpoints.getTeam.initiate(teamNameS)
          );

          setTeams(response.data);
        } catch (error) {}
      })();
    }
  }, [teamNameS, dispatch]);

  const control = () => {
    dispatch(addProjectModal(false));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (project?.id) {
      // update project
      updateProject({
        projectId: project?.id,
        data: {
          name: projectName,
          description,
          date: new Date().toDateString(),
        },
      });

      setDisabled(true);
    } else if (!project?.id) {
      //   create project
      if (teamId && teamName) {
        try {
          const response = await dispatch(
            teamsApi.endpoints.getTeamById.initiate(teamId)
          ).unwrap();

          createProject({
            teamId,
            name: projectName,
            members: [user?.id],
            teamName,
            color: response.color,
            description,
            stage: "backlog",
            creator: user?.id,
            date: new Date().toDateString(),
          });
        } catch (error) {
          console.log(error);
        }

        setDisabled(true);
      }
    }

    dispatch(addProjectModal(false));
  };

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/10 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Modal
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              {/* Team Name Section */}
              {isProjectEmpty && (
                <>
                  <div className="flex items-left flex-col pl-4 pr-4 gap-1 mb-3">
                    <label htmlFor="name">Team Name</label>
                    <input
                      type="text"
                      className="rounded-md focus:outline-none focus:ring border-2 px-2 py-1"
                      id="name"
                      onChange={debounce((e) => setTeamNameS(e.target.value))}
                    />
                  </div>
                  <div className="ml-5 pb-5">
                    {teams?.length > 0 &&
                      teams.map((t) => (
                        <p
                          key={t.id}
                          className="border-2 p-2 w-3/4"
                          onClick={(e) => {
                            setTeamId(t.id);
                            setTeamName(t.name);
                            setTeams([]);
                          }}
                        >
                          {t.name}
                        </p>
                      ))}
                  </div>
                </>
              )}
              <div className="flex items-left flex-col pl-4 pr-4 gap-1 mb-3">
                <label htmlFor="name">Project Name</label>
                <input
                  type="text"
                  className="rounded-md focus:outline-none focus:ring border-2 px-2 py-1"
                  id="name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>

              {/* Description Section */}
              <div className="flex items-left flex-col pl-4 pr-4 gap-1 mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                  rows={5}
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="rounded-md focus:outline-none focus:ring border-2 px-2 py-1"
                />
              </div>
            </div>

            <div>
              <button
                disabled={disabled}
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500`}
              >
                Submit
              </button>
            </div>

            {/* {participant?.length === 0 && (
              <Error message="This user does not exist!" />
            )}

            {participant?.length > 0 &&
              participant[0].email === user?.email && (
                <Error message="You can not send message to yourself!" />
              )}

            {responseErr && <Error message={responseErr} />} */}
          </form>
        </div>
      </>
    )
  );
}
