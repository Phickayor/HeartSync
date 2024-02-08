"use client";
import ActivityBar from "@/components/Admin/ActivityBar";
import { CheckAuth } from "@/components/Controllers/CheckAuth";
import Profile from "@/components/Admin/Profile";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const [profileInfo, setProfileInfo] = useState({});
  const router = useRouter();
  const token = Cookies.get("token");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authorizationChecked, setAuthorizationChecked] = useState(false);
  const CheckAuthorization = async () => {
    var user = await CheckAuth(token);
    setIsAuthorized(user.success);
    setProfileInfo(user);
    setAuthorizationChecked(true);
  };
  useEffect(() => {
    CheckAuthorization();
  }, []);
  if (!authorizationChecked) {
    return null;
  }
  return isAuthorized ? (
    <div className="fixed flex h-screen w-full">
      <ActivityBar activeBar={"profile"} />
      <Profile profileInfo={profileInfo} />
    </div>
  ) : (
    router.push("/auth")
  );
}

export default Page;
