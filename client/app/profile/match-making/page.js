import Preference from "@/components/Profile/Preference";
import { Urbanist } from "next/font/google";
import React from "react";
const urbanist = Urbanist({
  weight: ["300", "400", "500"],
  subsets: ["latin"]
});

function page() {
  return (
    <div
      className={`${urbanist.className} min-h-screen w-full bg-[#121212] bg-cover bg-[url("/images/auth-bg.png")]`}
    >
      <Preference />
    </div>
  );
}

export default page;
