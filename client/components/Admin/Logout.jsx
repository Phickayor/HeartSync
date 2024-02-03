import React from "react";

function Logout() {
  return (
    <div className="bg-[#171717] w-full flex flex-col justify-center py-10 text-white text-center ">
      <div className="bg-[#1E1D1D] mx-auto w-1/2 h-3/5 p-20 space-y-6 rounded-lg">
        <h3 className="text-2xl">Are you sure you want to logout?</h3>
        <button className="px-12 py-2 rounded-md bg-[#891919]">Logout</button>
      </div>
    </div>
  );
}

export default Logout;
