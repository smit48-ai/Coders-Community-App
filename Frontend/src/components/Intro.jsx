import React from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { Link } from "react-router-dom";
import hero from "../assests/hero.png";
import "./Intro.css";

function tomain() {
  document.querySelectorAll("homescreen")[0].style.color = "black";
}

function Intro(props) {
  return (
    <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1 items-center p-10">
      <div className="m-4">
        <h1 className="text-4xl text-white font-Poppins font-extrabold m-2">
          Learning starts when you are able to make other learn
        </h1>
        <div className="text-xl text-white font-Poppins m-2">
          Coders Blodding is a vibrant online community dedicated to empowering
          coders of all levels. Whether you're a seasoned developer or just
          starting out, our platform offers a wealth of resources, tutorials,
          and discussions to help you enhance your coding skills and stay
          updated with the latest trends in technology.
        </div>
        <Link to="/Login" className="m-2">
          <button className="bg-blue-700 rounded-md p-4 text-white text-2xl">
            Join Us
          </button>
        </Link>
      </div>
      <div className="">
        <img src={hero}></img>
      </div>
      {/* <span onClick={tomain}><a href="/Main"><KeyboardDoubleArrowDownIcon fontSize="large"></KeyboardDoubleArrowDownIcon></a></span> */}
    </div>
  );
}

export default Intro;
