import AdminComp from "@/components/Admin/AdminComp";
import CardPreview from "@/components/Auth/Registration/CardPreview";
import React from "react";

function page() {
  return (
    <AdminComp navName={"settings"}>
      <CardPreview />
    </AdminComp>
  );
}

export default page;
