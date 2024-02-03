import React from "react";
import Login from "../../components/Auth/Login";

function page() {
  return (
    <div className='flex flex-col justify-center h-screen fixed w-full bg-[#121212] bg-cover bg-[url("/images/auth-bg.png")]'>
      <Login />
    </div>
  );
}

export default page;
