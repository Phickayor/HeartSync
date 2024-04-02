import React from "react";
import Contact from "@/components/Admin/Messaging/Contact";
import Message from "@/components/Admin/Messaging/Message";
import AdminComp from "@/components/Admin/AdminComp";

function Page({ params }) {
  return (
    <AdminComp navName={"message"}>
      <Contact/>
      <Message receiverId={params.receiverId} />
    </AdminComp>
  ); }

export default Page;
