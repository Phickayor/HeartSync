import AdminComp from "@/components/Admin/AdminComp";
import Preference from "@/components/Setup/Preference";
import React from "react";

function page() {
  return (
    <AdminComp navName={"settings"}>
      <div className="pattern-background bg-[#171717]">
        <Preference />
      </div>
    </AdminComp>
  );
}

export default page;
