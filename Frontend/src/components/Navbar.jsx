import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <div className="font-Poppins sticky p-10 flex justify-between items-center">
      <div>
        <Link to="/">
          <span className="text-3xl text-white">Transfer</span>
        </Link>
      </div>
      <ul>
        <Link to="/Login" className="m-2">
          <button className="bg-blue-700 rounded-md p-4 text-white hover:bg-blue-500">
            Get Started
          </button>
        </Link>
      </ul>
    </div>
  );
}
export default Navbar;
