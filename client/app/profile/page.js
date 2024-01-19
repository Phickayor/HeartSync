"use client";
import About from "@/components/Profile/About";
import Description from "@/components/Profile/Description";
import ProfileSection from "@/components/Profile/ProfileSection";
import { Urbanist } from "next/font/google";
import React, { useState } from "react";
const urbanist = Urbanist({
  weight: ["300", "400", "500"],
  subsets: ["latin"]
});

function page() {
  const [currentContent, setCurrentContent] = useState("about");

  const handleContentChange = (content) => {
    setCurrentContent(content);
  };

  return (
    <div
      className={`${urbanist.className} flex flex-col justify-center h-screen fixed w-full bg-[#121212] bg-cover bg-[url("/images/auth-bg.png")]`}
    >
      {currentContent == "about" ? (
        <About contentHandler={handleContentChange} />
      ) : currentContent == "description" ? (
        <Description contentHandler={handleContentChange} />
      ) : (
        <ProfileSection contentHandler={handleContentChange} />
      )}
    </div>
  );
}

export default page;
