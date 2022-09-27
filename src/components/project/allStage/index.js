import React from "react";
import Backlog from "./Backlog";
import Blocked from "./Blocked";
import Doing from "./Doing";
import Done from "./Done";
import Ready from "./Ready";
import Review from "./Review";

export default function Stages() {
  return (
    <div className="flex flex-grow px-10 mt-4 overflow-auto">
      <div className="flex justify-start space-x-6 w-full">
        <Backlog />
        <Ready />
        <Review />
        <Doing />
        <Blocked />
        <Done />
      </div>
    </div>
  );
}
