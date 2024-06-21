import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assests/logo.jpg";
import "./Navbar.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar(props) {
  return (
    <div className="font-Poppins sticky p-10 flex justify-between items-center">
      <div>
        <Link to="/">
          <span className="text-3xl text-white">Transfer</span>
        </Link>
      </div>
      <ul>
         <button className="bg-blue-700 rounded-md p-4 text-white">Get Started</button>
      </ul>
    </div>
  );
}
export default Navbar;
