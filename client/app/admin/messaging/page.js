import React from "react";
import Contact from "@/components/Admin/Messaging/Contact";
import AdminComp from "@/components/Admin/AdminComp";
import Message from "@/components/Admin/Messaging/Message";

function Page() {
  return (
    <AdminComp navName={"message"}>
      <div className="grid md:grid-cols-3 w-full pattern-background text-[#131725]">
        <div className="relative">
          <Contact />
        </div>
        <div className="hidden md:block col-span-2 ">
          <Message />
        </div>
      </div>
    </AdminComp>
  );
}

export default Page;
