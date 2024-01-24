import ActivityBar from "@/components/Profile/ActivityBar";
import Contact from "@/components/Profile/Messaging/Contact";
import Message from "@/components/Profile/Messaging/Message";
import React from "react";

function page() {
  return (
    <div className="fixed flex h-screen w-full">
      <ActivityBar activeBar={"message"}/>
      <Contact />
      <Message/>
    </div>
  );
}

export default page;
