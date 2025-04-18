import React, { useState } from "react";
import MainNavBar from "../components/MainNavbar";
import Feedpage from "../components/Feedpage";
import MenuList from "../components/MenuList";
import "./Main.css";
import UserGroup from "../components/UserGroup";
import { Link } from "react-router-dom";
//icons
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import StyleIcon from "@mui/icons-material/Style";
import PhoneIcon from "@mui/icons-material/Phone";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";
import Footer from "../components/Footer";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TopFollowed } from "../Actions/user";
import { postbysearch } from "../Actions/Posts";

function Main() {
  const Topusers = useSelector((state) => state.User.Topusers);
  const dispatch = useDispatch();
  const [searchitem, setSearchitem] = useState("");
  useEffect(() => {
    dispatch(TopFollowed());
  }, [dispatch]);
  return (
    <section className="min-h-screen">
      <MainNavBar fixed={1} />
      <div className="max-md:block hidden pt-[70px] bg-slate-200">
        <div className="w-screen md:px-4 relative">
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
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-gray-700 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-gray-300 focus:outline-none"
            placeholder="Search"
            onChange={(e) => {
              setSearchitem(e.target.value);
            }}
            value={searchitem}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log("Evente triggered");
                dispatch(postbysearch(searchitem));
              }
            }}
          />
          {/* Right Clear (×) Button */}
          {searchitem && (
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
      <section className="content justify-center bg-slate-200 md:pt-[100px] pt-3 mx-auto min-h-screen">
        <div className="min-w-fit md:min-w-[250px] pr-10 mt-0 md:pl-10 font-Poppins max-lg:hidden">
          <ul>
            <li>
              <Link
                to="/Main"
                className="flex gap-2 p-2 pl-3 hover:bg-slate-300 rounded-md transition-bg duration-200"
              >
                <HomeIcon />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Post"
                className="flex gap-2 p-2 hover:bg-slate-300 rounded-md transition-bg duration-200"
              >
                <CreateIcon />
                Create Post
              </Link>
            </li>
            <li>
              <Link
                to="/SavePosts"
                className="flex gap-2 p-2 hover:bg-slate-300 rounded-md transition-bg duration-200"
              >
                <ListIcon />
                Saved list
              </Link>
            </li>
            {/* <li className="flex gap-2 p-2 hover:bg-slate-300 rounded-md transition-bg duration-200">
              <StyleIcon />
              Tags
            </li> */}
            <li className="">
              <a
                href="https://portfolio-omega-blond-84.vercel.app/"
                className="flex gap-2 p-2 hover:bg-slate-300 rounded-md transition-bg duration-200"
              >
                <PhoneIcon />
                Contact me
              </a>
            </li>
          </ul>
        </div>
        <Feedpage />
        <div className="max-lg:hidden ml-10">
          <UserGroup
            Topusers={Topusers}
            title="Top contibutors you should follow"
          />
        </div>
      </section>
      <Footer />
    </section>
  );
}

export default Main;
