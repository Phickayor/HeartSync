import ForgotPassword from "@/components/Auth/ForgotPassword";
import React from "react";

function page() {
  return (
    <div className="flex flex-col justify-center h-screen fixed w-full bg-[#202020] text-white">
      <ForgotPassword />
    </div>
  );
}

export default page;
