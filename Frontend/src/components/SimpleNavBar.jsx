import React from "react";
import { useNavigate } from "react-router-dom";

const SimpleNavBar = ({ location }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between w-full items-center bg-white shadow z-50 ring-3 ring-gray-300 p-4">
      <h1 className="text-4xl">{location}</h1>
      <button
        type="submit"
        className="bg-gray-900 hover:bg-gray-950 text-white font-bold font-Poppins py-2 px-4 rounded"
        onClick={() => {
          navigate("/Main");
        }}
      >
        Home
      </button>
    </div>
  );
};

export default SimpleNavBar;
