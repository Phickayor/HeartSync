import Preference from "@/components/Setup/Preference";
import React from "react";

function page() {
  return (
    <div className='min-h-screen w-full bg-[#121212] bg-cover bg-[url("/images/auth-bg.png")]'>
      <Preference />
    </div>
  );
}

export default page;
