import AdminComp from "@/components/Admin/AdminComp";
import Profile from "@/components/Admin/Profile";
import React from "react";

function Page() {
  return (
    <div className="fixed flex h-screen w-full">
      <AdminComp navName={"profile"}>
        <Profile/>
      </AdminComp>
    </div>
  );
}

export default Page;
