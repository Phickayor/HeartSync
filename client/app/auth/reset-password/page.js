import { ResetPassword } from "@/components/Verify";
import { Urbanist } from "next/font/google";
import React from "react";
const urbanist = Urbanist({
  weight: ["300", "400", "500"],
  subsets: ["latin"]
});
function page() {
  return (
    <div
      className={`${urbanist.className} flex flex-col justify-center h-screen fixed w-full bg-[#121212] bg-cover bg-[url("/images/auth-bg.png")]`}
    >
      <ResetPassword />
    </div>
  );
}

export default page;
