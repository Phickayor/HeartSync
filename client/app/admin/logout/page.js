import ActivityBar from "@/components/Admin/ActivityBar";
import Logout from "@/components/Admin/Logout";
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
