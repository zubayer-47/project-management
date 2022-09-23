import React from "react";
import logo from '../assets/logo.png';
import Nav from "../components/Nav";
import TeamCard from "../components/TeamCard";
import { useGetTeamsQuery } from "../features/teams/teamsApi";
import useAuth from "../hooks/useAuth";

export default function Teams() {
  const {data, isSuccess} = useGetTeamsQuery(2)
  // const {teams} = useSelector(state => state.team);
  useAuth()

  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      <Nav />

      <div className="px-10 mt-6 flex justify-between">
        <h1 className="text-2xl font-bold">Teams</h1>
        <button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100">
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

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
        <TeamCard />
        <TeamCard />
        <TeamCard />
        <TeamCard />
        <TeamCard />
        <TeamCard />
      </div>

      <a
            className="fixed bottom-0 right-0 flex items-center justify-center h-8 pl-1 pr-2 mb-6 mr-4 text-blue-100 bg-indigo-600 rounded-full shadow-lg hover:bg-blue-600"
            href="https://learnwithsumit.com"
            target="_blank" rel="noreferrer"
        >
            <div
                className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full"
            >
                <img src={logo} alt="LWS Logo" />
            </div>
            <span className="ml-1 text-sm leading-none">Learn with Sumit</span>
        </a>
    </div>
  );
}
