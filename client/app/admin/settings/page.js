"use client";
import ActivityBar from "@/components/Profile/ActivityBar";
import AllSetings from "@/components/Profile/Settings/AllSetings";
import EditProfile from "@/components/Profile/Settings/EditProfile";
import React, { useState } from "react";

function page() {
  const [name, setName] = useState(null);
  const handleEdit = (name) => {
    setName(name);
  };
  return (
    <div className="fixed flex h-screen w-full">
      <ActivityBar activeBar={"settings"} />
      <AllSetings editHandler={handleEdit} />
      {name ? <EditProfile name={name} editHandler={handleEdit} /> : <></>}
    </div>
  );
}
export default page;
