import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addModal } from "../../features/modal/modalSlice";

export default function TeamModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-20 cursor-default">
      <div className="bg-white max-w-lg m-auto translate-y-10">
        <div className="flex justify-between p-4">
          <div>Team Modal</div>
          <button
            className="cursor-pointer"
            onClick={() => {
              dispatch(addModal());
            }}
          >
            Close
          </button>
        </div>
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

        <div className="flex items-left flex-col pl-4 pr-4 gap-1 mb-3">
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

        <button
          onClick={() => console.log(color, name)}
          className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-4 mb-5"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
