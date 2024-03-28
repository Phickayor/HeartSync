"use client";
import ActivityBar from "@/components/Admin/ActivityBar";
import { CheckAuth } from "@/components/Controllers/CheckAuth";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Contact from "@/components/Admin/Messaging/Contact";

function Page() {
  const router = useRouter();
  const token = Cookies.get("token");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [profile, setProfile] = useState({});
  const [authorizationChecked, setAuthorizationChecked] = useState(false);
  const CheckAuthorization = async () => {
    var user = await CheckAuth(token);
    setIsAuthorized(user.success);
    setProfile(user.profile);
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
      <ActivityBar activeBar={"message"} />
      <Contact profile={profile} />
      
    </div>
  ) : (
    router.push("/auth")
  );
}

export default Page;
