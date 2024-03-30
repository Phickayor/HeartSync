import AllSetings from "@/components/Admin/Settings/AllSetings";
import React from "react";
import AdminComp from "@/components/Admin/AdminComp";

function Page() {
  return (
    <AdminComp navName={"settings"}>
      <AllSetings />
    </AdminComp>
  );
}

export default Page;
