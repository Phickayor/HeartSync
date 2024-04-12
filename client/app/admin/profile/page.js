import AdminComp from "@/components/Admin/AdminComp";
import Profile from "@/components/Admin/Profile";
import React from "react";

function Page() {
  return (
    <AdminComp navName={"profile"}>
      <Profile userId={null} />
    </AdminComp>
  );
}

export default Page;
