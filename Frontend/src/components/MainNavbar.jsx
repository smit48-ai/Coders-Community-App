import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { logout } from "../Actions/Auth";
import { getCurrentUser } from "../Actions/user";
import { useDispatch, useSelector } from "react-redux";
import isAuthenticated from "../assests/isAuthenticated";
import { postbysearch } from "../Actions/Posts";

//css
import "./MainNavbar.css";

//Material ui
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import MenuList from "./MenuList";
import SearchIcon from "@mui/icons-material/Search";
import ButtonGroup from "@mui/material/ButtonGroup";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";

function MainNavBar(props) {
  ///state to check that wether the menu is open or not
  const [open, setopen] = useState(false);
  const reftosearch = useRef();
  const [serachitem, setSearchitem] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.User.userdata);

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
                    <div className="relative">
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
                        className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-0">
                <button
                  className="mx-4 text-gray-600 transition-colors duration-300 transform md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
                  aria-label="show notifications"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex items-center focus:outline-none"
                  aria-label="toggle profile dropdown"
                >
                  <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                      className="object-cover w-full h-full"
                      alt="avatar"
                    />
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile Menu open: "block", Menu closed: "hidden" */}

           
            <MenuList
              isopen={open}
              closemenu={() => {
                slidingmenu();
              }}
            />
          
          </div>
        </div>
      </nav>
    </>
  );
  // return <nav className='Navbar'>
  //         <div className='hameburger'>
  //             <MenuIcon onClick={slidingmenu} className='menuicon' fontSize='large' sx={{ display: { xs: 'block', md: 'none' }}}/>
  //             <Link to="/Main" style={{textDecoration:"none", color:"white"}}><h1>Transfer</h1></Link>
  //         </div>
  //         {open && <MenuList isopen={open} closemenu={slidingmenu}/>}
  //         {location.pathname==='/Main' && <div className='SearchBar'>
  //              <ButtonGroup variant="outlined" aria-label="outlined button group">
  //               <input ref={reftosearch} value={serachitem} type="search" className="searchbar" onChange={(e)=>{
  //                     setSearchitem(e.target.value);
  //               }}></input>
  //               <SearchIcon fontSize="medium" style={{cursor:"pointer", border:"2px solid white", borderRadius:"0 10px 10px 0 "}} onClick={(e)=>{
  //                   dispatch(postbysearch(serachitem));
  //               }}></SearchIcon>
  //             </ButtonGroup>
  //         </div>}
  //         <div className='Menu'>
  //            <NotificationsIcon className="notification-icon" fontSize='large'/>
  //            <Link to={`/Profile/${user?._id}`}>
  //            <Avatar src={PF + user?.ProfilePicture} />
  //            </Link>
  //            <LogoutIcon onClick={HandleLogout} style={{cursor:"pointer"}}></LogoutIcon>
  //         </div>
  // </nav>
}

export default MainNavBar;
