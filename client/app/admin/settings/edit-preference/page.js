import AdminComp from "@/components/Admin/AdminComp";
import Preference from "@/components/Auth/Registration/Preference";
import React from "react";

function page() {
  return (
    <AdminComp navName={"settings"}>
      <div className="pattern-background text-[#131725]">
        <Preference action={"edit"} />
      </div>
    </AdminComp>
  );
}

export default page;
