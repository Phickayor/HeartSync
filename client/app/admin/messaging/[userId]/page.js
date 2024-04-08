import React from "react";
import Contact from "@/components/Admin/Messaging/Contact";
import Message from "@/components/Admin/Messaging/Message";
import AdminComp from "@/components/Admin/AdminComp";

function Page({ params }) {
  return (
    <AdminComp navName={"message"}>
      <div className="grid md:grid-cols-3 w-full">
        <div className="hidden md:block relative">
          <Contact />
        </div>
        <div className="col-span-2 ">
          <Message userId={params.userId} />
        </div>
      </div>
    </AdminComp>
  );
}

export default Page;
