import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../Actions/Auth";
import { useDispatch, useSelector } from "react-redux";
import { postbysearch } from "../Actions/Posts";

//css
import "./MainNavbar.css";

import MenuList from "./MenuList";

function MainNavBar(props) {
  ///state to check that wether the menu is open or not
  const [open, setopen] = useState(false);
  const [serachitem, setSearchitem] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.User.userdata);
  useEffect(() => {
    console.log(user);
  }, [user]);

  function HandleLogout() {
    dispatch(logout());
  }
  function slidingmenu() {
    setopen(!open);
  }
  return (
    <>
      {/* Require css */}
      {/* //TODO: check for these fixed thing */}
      <nav className="w-full fixed top-0 bg-white shadow z-50 ring-3 ring-gray-300">
        <div className="container px-6 py-3 mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-2">
                <button
                  x-cloak=""
                  onClick={slidingmenu}
                  type="button"
                  className="text-gray-500 lg:hidden dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                  aria-label="toggle menu"
                >
                  {!open ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 8h16M4 16h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
                <div className="flex items-center">
                  <Link to="/Main" className="text-2xl">
                    <h1>Transfer</h1>
                  </Link>

                  {/* Search input on desktop screen */}
                  <div className="hidden mx-10 md:block">
                    <div className="relative w-[600px]">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <input
                        type="text"
                        className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-gray-700 dark:focus:border-blue-300 focus:ring focus:ring-opacity-40 focus:ring-gray-300 focus:outline-none"
                        placeholder="Search"
                        onChange={(e) => {
                          setSearchitem(e.target.value);
                        }}
                        value={serachitem}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            console.log("Evente triggered");
                            dispatch(postbysearch(serachitem));
                          }
                        }}
                      />
                      {/* Right Clear (×) Button */}
                      {serachitem && (
                        <button
                          onClick={() => {
                            setSearchitem("");
                            dispatch(postbysearch(""));
                          }}
                          className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600 text-2xl font-bold transition-transform duration-100 active:scale-90"
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-0">
                <button
                  type="button"
                  className="flex items-center focus:outline-none"
                  aria-label="toggle profile dropdown"
                >
                  <Link to={`/Profile/${user?._id}`}>
                    <div className="w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full">
                      <img
                        src={
                          user?.ProfilePicture?.startsWith("https")
                            ? user.ProfilePicture
                            : PF + user?.ProfilePicture
                        }
                        className="object-cover w-full h-full"
                        alt="avatar"
                      />
                    </div>
                  </Link>
                </button>
                <button
                  onClick={HandleLogout}
                  tooltip="Logout"
                  className="text-gray-600 hover:text-black transition duration-300 text-xl ml-3 lg:block hidden"
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
                </button>
              </div>
            </div>

            {/* Mobile Menu open: "block", Menu closed: "hidden" */}

            <MenuList
              isopen={open}
              setopen={setopen}
              closemenu={() => {
                slidingmenu();
              }}
            />
          </div>
        </div>
      </nav>
    </>
  );
}

export default MainNavBar;
