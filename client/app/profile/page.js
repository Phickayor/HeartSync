"use client";

import About from "@/components/Setup/About";
import Description from "@/components/Setup/Description";
import ProfileSection from "@/components/Setup/ProfileSection";
import React, { useState } from "react";

function page() {
  const [currentContent, setCurrentContent] = useState("about");

  const handleContentChange = (content) => {
    setCurrentContent(content);
  };

  return (
    <div className='flex flex-col justify-center h-screen fixed w-full bg-[#121212] bg-cover bg-[url("/images/auth-bg.png")]'>
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
