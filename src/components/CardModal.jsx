import React from "react";

export default function CardModal({
  handleFirst,
  handleSecond,
  firstTitle,
  secondTitle,
  thirdTitle,
  handleThird = () => {},
  canDelete,
}) {
  return (
    <>
      <ul className="absolute right-7 top-8 bg-slate-200 shadow-md text-center z-10">
        <li
          className="text-sm border-b border-b-slate-100 px-7 py-1"
          onClick={handleFirst}
        >
          {firstTitle}
        </li>
        <li className="text-sm px-7 py-1" onClick={handleSecond}>
          {secondTitle}
        </li>
        {canDelete && (
          <li className="text-sm px-7 py-1" onClick={handleThird}>
            {thirdTitle}
          </li>
        )}
      </ul>
    </>
  );
}
