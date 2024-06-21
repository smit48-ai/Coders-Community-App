import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TopFollowed } from "../Actions/user";
import Usercard from "../components/usercard";
import "./Usergroup.css";

const UserGroup = () => {
  const Topusers = useSelector((state) => state.User.Topusers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(TopFollowed());
  }, [dispatch]);

  return (
    <div className=" bg-white min-w-fit max-lg:hidden mx-auto px-4 rounded-md ring-1 ring-gray-300 pt-4 h-fit">
      <div className="font-Poppins text-xl text-center">Active users</div>
      <ul className="divide-y divide-gray-100">
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
