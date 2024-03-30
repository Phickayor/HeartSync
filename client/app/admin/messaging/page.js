import React from "react";
import Contact from "@/components/Admin/Messaging/Contact";
import AdminComp from "@/components/Admin/AdminComp";
import Message from "@/components/Admin/Messaging/Message";

function Page() {
  return (
    <AdminComp navName={"message"}>
      <div className="grid grid-cols-3 w-full text-white">
        <div className="bg-[#171717]">
          <Contact />
        </div>
        <div className="col-span-2 bg-[#161616] ">
          <Message />
        </div>
      </div>
    </AdminComp>
  );
}

export default Page;
