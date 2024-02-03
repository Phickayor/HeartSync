import Verify from "@/components/Auth/Verify";
import React from "react";

function page() {
  return (
    <div className='flex flex-col justify-center h-screen fixed w-full bg-[#121212] bg-cover bg-[url("/images/auth-bg.png")]'>
      <Verify />
    </div>
  );
}

export default page;
