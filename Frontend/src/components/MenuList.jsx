import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouseChimney} from '@fortawesome/free-solid-svg-icons'

//icons
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import StyleIcon from "@mui/icons-material/Style";
import PhoneIcon from "@mui/icons-material/Phone";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";

function MenuList(props) {
  return (
    <>
      {props.isopen && <div class="fixed inset-0 bg-black opacity-50 z-20" id="overlay"></div>}
      <div
        className={
          props.isopen
            ? "bg-gray-800 text-white min-w-[250px] min-h-screen py-4 absolute top-0 font-Poppins left-0 z-50 translate-x-0"
            : "hidden"
         }
      >
        <ul>
          {props.isopen && (
            <li onClick={props.closemenu}>
              <CloseIcon className="close-icon transition-transform"></CloseIcon>
            </li>
          )}
          <li>
            <Link
              to="/Main"
              className="flex gap-2 p-2 hover:bg-slate-300 rounded-md "
            >
              <FontAwesomeIcon icon={faHouseChimney} />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/Post"
              className="flex gap-2 p-2 hover:bg-slate-300 rounded-md"
            >
              <CreateIcon />
              Create Post
            </Link>
          </li>
          <li>
            <Link
              to="/SavePosts"
              className="flex gap-2 p-2 hover:bg-slate-300 rounded-md"
            >
              <ListIcon />
              Saved list
            </Link>
          </li>
          <li className="flex gap-2 p-2 hover:bg-slate-300 rounded-md">
            <StyleIcon />
            Tags
          </li>
          <li className="flex gap-2 p-2 hover:bg-slate-300 rounded-md">
            <PhoneIcon />
            Contact me
          </li>
        </ul>
      </div>
    </>
  );
}

export default MenuList;
