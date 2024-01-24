import ActivityBar from "@/components/Profile/ActivityBar";
import React from "react";

function page() {
  return (
    <div className="fixed flex h-screen w-full">
      <ActivityBar activeBar={"home"} />
    </div>
  );
}

export default page;
