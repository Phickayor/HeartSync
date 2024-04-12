"use client";
import React from "react";
import Contact from "@/components/Admin/Messaging/Contact";
import AdminComp from "@/components/Admin/AdminComp";
import Message from "@/components/Admin/Messaging/Message";
import { useSearchParams } from "next/navigation";

function Page() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  return (
    <AdminComp navName={"message"}>
      <div className="grid md:grid-cols-3 w-full">
        <div className={userId && "hidden md:block relative"}>
          <Contact />
        </div>
        <div className={userId ? "col-span-2" : "hidden md:block col-span-2 "}>
          <Message userId={userId} />
        </div>
      </div>
    </AdminComp>
  );
}

export default Page;
