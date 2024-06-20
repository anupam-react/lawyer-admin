import React from "react";

const Spinner = () => {
  return (
    <div className="spinner">
      <div className="flex space-x-2 justify-center items-center bg-white h-screen dark:invert">
        <span className="sr-only">Loading...</span>
        <div className="h-5 w-5 bg-[#0F2C64] rounded-full animate-bounce [animation-delay:-0.1s]"></div>
        <div className="h-5 w-5 bg-[#0F2C64] rounded-full animate-bounce [animation-delay:-0.10s]"></div>
        <div className="h-5 w-5 bg-[#0F2C64] rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Spinner;
