import React from "react";
import Login from "../../components/Auth/Login";

function page() {
  return (
    <div className="flex flex-col justify-center h-screen fixed w-full bg-[#202020] text-white">
      <Login />
    </div>
  );
}

export default page;
