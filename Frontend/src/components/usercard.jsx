import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FollowUser, UnFollowUser } from "../Actions/user";

const Usercard = (props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const currentuser = useSelector((state) => state.User.userdata);
  const [isFollow, setisFollow] = useState(false);
  useEffect(() => {
    const newstate = currentuser?.Following?.includes(props.user._id)
      ? true
      : false;
    setisFollow(newstate);
  }, [currentuser, props]);

  function handlefollow() {
    setisFollow((prev) => !prev);
    if (!isFollow) {
      dispatch(FollowUser(currentuser?._id, props.user._id));
    } else {
      dispatch(UnFollowUser(currentuser?._id, props.user._id));
    }
  }
  return (
    <>
      <li
        key={props.user._id}
        className="flex justify-between gap-x-6 py-5 min-w-[300px] font-Poppins "
      >
        <div className="flex min-w-0 gap-x-4">
          <Link to={`/Profile/${props.user._id}`}>
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={
                props.user.ProfilePicture
                  ? props.user.ProfilePicture.startsWith("https")
                    ? props.user.ProfilePicture
                    : PF + props.user.ProfilePicture
                  : PF + "dummy-profile-pic.png"
              }
              alt=""
            />
          </Link>
          <div className="min-w-0 flex-auto">
            <Link to={`/Profile/${props.user._id}`}>
              <p className="text-sm font-semibold leading-6 text-gray-900 ">
                {" "}
                {props.user.username}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {" "}
                {props.user.emailid}
              </p>
            </Link>
            {props.user?._id !== currentuser?._id && (
              <button
                className="mt-2 inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition duration-300 shadow 
    bg-gray-700 text-white hover:bg-gray-800"
                onClick={() => {
                  handlefollow();
                }}
              >
                {!isFollow ? "Follow" : "Unfollow"}
              </button>
            )}
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end"></div>
      </li>
    </>
  );
};

export default Usercard;
