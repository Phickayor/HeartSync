"use client";
import ActivityBar from "@/components/Admin/ActivityBar";
import Profile from "@/components/Admin/Profile";
import { CheckAuth } from "@/components/Controllers/CheckAuth";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

function page() {
  const [profileInfo, setProfileInfo] = useState({});
  const token = Cookies.get("token");
  useEffect(() => {
    const fetchDetails = async () => {
      var profile = await CheckAuth(token);
      setProfileInfo(profile);
    };
    fetchDetails();
  }, []);
  return (
    <div className="fixed flex h-screen w-full">
      <ActivityBar activeBar={"profile"} />
      <Profile profileInfo={profileInfo} />
    </div>
  );
}

export default page;
