import Register from "@/components/Auth/Register";
import React from "react";

function page() {
  return (
    <div className='flex flex-col justify-center h-screen fixed w-full bg-[#121212] bg-cover bg-[url("/images/auth-bg.png")]'>
      <Register />
    </div>
  );
}

export default page;
