import AdminComp from "@/components/Admin/AdminComp";
import Profile from "@/components/Admin/Profile";
import React from "react";

function page({ params }) {
  return (
    <AdminComp>
      <Profile userId={params.id} />
    </AdminComp>
  );
}

export default page;
