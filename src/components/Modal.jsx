import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addModal } from "../features/modal/modalSlice";
import {
  teamsApi,
  useAddTeamToUserMutation,
  useUpdateTeamMutation
} from "../features/teams/teamsApi";

export default function Modal({ open }) {
  const { data } = useSelector((state) => state.modal);
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState(data?.name ?? "");
  const [description, setDescription] = useState(data?.description ?? "");
  const [color, setColor] = useState(data?.color ?? "");

  const [updateTeam] = useUpdateTeamMutation();
  const [addTeamToUser] = useAddTeamToUserMutation();
  const dispatch = useDispatch();

  const control = () => {
    dispatch(addModal(false));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data?.id) {
      updateTeam({
        teamId: data?.id,
        data: {
          name,
          description,
          color,
          date: new Date().toDateString(),
        },
      });
    } else {
      const response = await dispatch(
        teamsApi.endpoints.createTeam.initiate({
          userId: user?.id,
          data: {
            name,
            description,
            color,
            date: new Date().toDateString(),
          },
        })
      );

      addTeamToUser({
        userId: user?.id,
        teams: [...user?.teams, response?.data?.id],
      });
    }

    dispatch(addModal(false));
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
            {data?.id ? "Edit Team Modal" : "Add Team Modal"}
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              {/* Team Name Section */}
              <div className="flex items-left flex-col pl-4 pr-4 gap-1 mb-3">
                <label htmlFor="name">Team Name</label>
                <input
                  type="text"
                  className="rounded-md focus:outline-none focus:ring border-2 px-2 py-1"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

              {/* color section */}
              <div className="flex items-left flex-col pl-4 pr-4 gap-1 py-2">
                <label htmlFor="color">Color</label>
                <div className="flex gap-4">
                  <span
                    className={`bg-red-400 w-4 h-4 rounded-full ${
                      color === "red" ? "ring ring-red-300" : ""
                    } cursor-pointer`}
                    onClick={(e) => setColor("red")}
                  ></span>
                  <span
                    className={`bg-purple-400 w-4 h-4 rounded-full  ${
                      color === "purple" ? "ring ring-purple-300" : ""
                    } cursor-pointer`}
                    onClick={(e) => setColor("purple")}
                  ></span>
                  <span
                    className={`bg-indigo-400 w-4 h-4 rounded-full ${
                      color === "indigo" ? "ring ring-indigo-300" : ""
                    } -indigo-400 cursor-pointer`}
                    onClick={(e) => setColor("indigo")}
                  ></span>
                  <span
                    className={`bg-orange-400 w-4 h-4 rounded-full ${
                      color === "orange" ? "ring ring-orange-300" : ""
                    } cursor-pointer`}
                    onClick={(e) => setColor("orange")}
                  ></span>
                  <span
                    className={`bg-amber-400 w-4 h-4 rounded-full ${
                      color === "amber" ? "ring ring-amber-300" : ""
                    } cursor-pointer`}
                    onClick={(e) => setColor("amber")}
                  ></span>
                  <span
                    className={`bg-green-400 w-4 h-4 rounded-full ${
                      color === "green" ? "ring ring-green-300" : ""
                    } cursor-pointer`}
                    onClick={(e) => setColor("green")}
                  ></span>
                  <span
                    className={`bg-lime-400 w-4 h-4 rounded-full ${
                      color === "lime" ? "ring ring-lime-300" : ""
                    }  cursor-pointer`}
                    onClick={(e) => setColor("lime")}
                  ></span>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500`}
              >
                Send Message
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
