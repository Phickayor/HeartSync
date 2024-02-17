"use client";

import Register from "@/components/Auth/Register";
import About from "@/components/Setup/About";
import Description from "@/components/Setup/Description";
import ProfileSection from "@/components/Setup/ProfileSection";
import React, { useState } from "react";

function page() {
  const [currentContent, setCurrentContent] = useState("register");

  const handleContentChange = (content) => {
    setCurrentContent(content);
  };

  return (
    <div className='flex flex-col justify-center h-screen fixed w-full bg-[#121212] bg-cover bg-[url("/images/auth-bg.png")]'>
      {currentContent == "profile" ? (
        <ProfileSection contentHandler={handleContentChange} />
      ) : currentContent == "about" ? (
        <About contentHandler={handleContentChange} />
      ) : (
        <Register contentHandler={handleContentChange} />
      )}
    </div>
  );
}

export default page;
