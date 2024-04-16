import AdminComp from "@/components/Admin/AdminComp";
import Search from "@/components/Admin/Search";
import React from "react";

function page() {
  return (
    <AdminComp navName={"search"}>
      <Search />
    </AdminComp>
  );
}

export default page;
