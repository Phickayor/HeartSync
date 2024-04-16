"use client";
import React, {useState } from "react";
import Contact from "@/components/Admin/Messaging/Contact";
import AdminComp from "@/components/Admin/AdminComp";
import Message from "@/components/Admin/Messaging/Message";
import { useSearchParams } from "next/navigation";

function Page() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [notifications, setNotifications] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <AdminComp navName={"message"}>
      <div className="grid lg:grid-cols-3 w-full">
        <div className={userId && "hidden lg:block relative"}>
          <Contact fetchAgain={fetchAgain} notifications={notifications} />
        </div>
        <div className={userId ? "col-span-2" : "hidden lg:block col-span-2 "}>
          <Message
            userId={userId}
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            notifications={notifications}
            setNotifications={setNotifications}
          />
        </div>
      </div>
    </AdminComp>
  );
}

export default Page;
