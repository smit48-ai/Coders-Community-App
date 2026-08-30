import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";

import ListIcon from "@mui/icons-material/List";
import PhoneIcon from "@mui/icons-material/Phone";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";
import { useDispatch } from "react-redux";
import { logout } from "../Actions/Auth";

function MenuList(props) {
  const dispatch = useDispatch();

  function HandleLogout() {
    dispatch(logout());
  }
  return (
    <>
      {props.isopen && (
        <div
          class="fixed inset-0 bg-black opacity-50 z-20"
          id="overlay"
          onClick={() => {
            props.setopen(false);
          }}
        ></div>
      )}
      <div
        className={`bg-gray-800 text-white w-[250px] min-h-screen py-6 px-4 absolute top-0 left-0 z-50 transform transition-transform duration-300 ease-in-out font-Poppins ${
          props.isopen ? "translate-x-0" : "-translate-x-[110%]"
        }`}
      >
        <div className="flex justify-end mb-4">
          <button onClick={props.closemenu}>
            <CloseIcon className="text-white text-2xl hover:text-gray-300 transition-transform hover:scale-110" />
          </button>
        </div>

        <ul className="flex flex-col gap-2">
          <li>
            <Link
              to="/Main"
              className="flex items-center gap-3 p-2 pl-3 hover:bg-slate-300 hover:text-black rounded-md transition-colors text-xl"
            >
              <FontAwesomeIcon icon={faHouseChimney} />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/Post"
              className="flex items-center gap-3 p-2 hover:bg-slate-300 hover:text-black rounded-md transition-colors text-xl"
            >
              <CreateIcon />
              Create Post
            </Link>
          </li>
          <li>
            <Link
              to="/SavePosts"
              className="flex items-center gap-3 p-2 hover:bg-slate-300 hover:text-black rounded-md transition-colors text-xl"
            >
              <ListIcon />
              Saved List
            </Link>
          </li>
          {/* <li className="flex items-center gap-3 p-2 hover:bg-slate-300 hover:text-black rounded-md transition-colors text-xl">
            <StyleIcon />
            Tags
          </li> */}
          <li className="">
            <a
              href="https://portfolio-omega-blond-84.vercel.app/"
              className="flex items-center gap-3 p-2 hover:bg-slate-300 hover:text-black rounded-md transition-colors text-xl"
            >
              <PhoneIcon />
              Contact Me
            </a>
          </li>
          <li>
            <button
              onClick={HandleLogout}
              tooltip="Logout"
              className="flex items-center gap-3 p-2 hover:bg-slate-300 hover:text-black rounded-md transition-colors text-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1"
                />
              </svg>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default MenuList;
