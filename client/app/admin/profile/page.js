import ActivityBar from "@/components/Admin/ActivityBar";
import Profile from "@/components/Admin/Profile";
import React from "react";

function page() {
  return (
    <div className="fixed flex h-screen w-full">
      <ActivityBar activeBar={"profile"} />
      <Profile/>
    </div>
  );
}

export default page;
