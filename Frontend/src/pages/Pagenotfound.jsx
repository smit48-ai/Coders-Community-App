import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Pagenotfound() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-[8rem] font-bold text-gray-800 drop-shadow-lg">
          404
        </h1>
        <p className="text-2xl md:text-3xl text-gray-700 font-semibold mb-6">
          Oops! Page not found.
        </p>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          It looks like the page you are trying to reach doesn’t exist or has
          been moved.
        </p>
        <Link
          to="/Main"
          className="inline-block px-6 py-3 bg-gray-600 text-white text-sm font-semibold rounded-md shadow hover:bg-gray-700 transition-all"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

export default Pagenotfound;
