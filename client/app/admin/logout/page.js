import ActivityBar from "@/components/Profile/ActivityBar";
import Logout from "@/components/Profile/Logout";
import React from "react";

function page() {
  return (
    <div className="fixed flex h-screen w-full">
      <ActivityBar activeBar={"logout"} />
      <Logout />
    </div>
  );
}

export default page;
