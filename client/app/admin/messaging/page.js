import ActivityBar from "@/components/Admin/ActivityBar";
import Contact from "@/components/Admin/Messaging/Contact";
import Message from "@/components/Admin/Messaging/Message";
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
