import React from "react";
import Login from "../../components/Auth/Login";

function page() {
  return (
    <div className='flex flex-col justify-center h-screen fixed w-full bg-white pattern-background'>
      <Login />
    </div>
  );
}

export default page;
