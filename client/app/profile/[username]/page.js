"use client";
import ActivityBar from "@/components/Admin/ActivityBar";
import Profile from "@/components/Admin/Profile";
import { GetProfile } from "@/components/Controllers/ProfileController";
import React, { useEffect, useState } from "react";

function page({ params }) {
  const [profileInfo, setProfileInfo] = useState({});
  useEffect(() => {
    const fetchDetails = async () => {
      var user = await GetProfile(params.username);
      setProfileInfo(user.profile);
      console.log(user.profile)
    };
    fetchDetails();
  }, []);
  return (
    <div className="fixed flex h-screen w-full">
      <ActivityBar activeBar={"home"} />
      <Profile profileInfo={profileInfo} />
    </div>
  );
}

export default page;
