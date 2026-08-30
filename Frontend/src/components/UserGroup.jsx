import React from "react";
import Usercard from "./usercard";

const UserGroup = ({ Topusers, title }) => {
  return (
    <div className=" bg-white mx-auto px-4 lg:rounded-md ring-1 ring-gray-300 pt-4 h-fit w-[20vw] max-lg:w-full max-lg:my-3">
      <div className="font-Poppins text-xl text-left">{title}</div>
      {Topusers.length === 0 && (
        <div className="flex justify-center items-center h-32 text-gray-500 font-Poppins text-lg">
          No Users Found
        </div>
      )}
      <ul className="divide-y divide-gray-100 overflow-scroll">
        {Topusers &&
          Topusers.map((x) => {
            return (
              <Usercard className="usercard" key={Topusers._id} user={x} />
            );
          })}
      </ul>
    </div>
  );
};

export default UserGroup;
