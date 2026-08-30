import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div class="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
    </div>
  );
};

export default Spinner;
