"use client";
import AdminComp from "@/components/Admin/AdminComp";
import Home from "@/components/Admin/Home";
import React from "react";

function Page() {
  return (
    <AdminComp navName={"home"}>
      <Home />
    </AdminComp>
  );
}

export default Page;
