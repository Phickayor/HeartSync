"use client";
import React from "react";
import Logout from "@/components/Admin/Logout";
import AdminComp from "@/components/Admin/AdminComp";

function Page() {
  return (
    <AdminComp navName={"logout"}>
      <Logout />
    </AdminComp>
  );
}

export default Page;
