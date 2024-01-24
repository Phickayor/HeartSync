import ActivityBar from "@/components/Profile/ActivityBar";
import Contact from "@/components/Profile/Messaging/Contact";
import Message from "@/components/Profile/Messaging/Message";
import AllSetings from "@/components/Profile/Settings/AllSetings";
import React from "react";

function page() {
  return (
    <div className="fixed flex h-screen w-full">
      <ActivityBar activeBar={"settings"} />
      <AllSetings />
    </div>
  );
}

export default page;
