"use client";
import ActivityBar from "@/components/Admin/ActivityBar";
import { CheckAuth } from "@/components/Controllers/CheckAuth";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Logout from "@/components/Admin/Logout";

function Page() {
  const router = useRouter();
  const token = Cookies.get("token");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authorizationChecked, setAuthorizationChecked] = useState(false);
  const CheckAuthorization = async () => {
    var user = await CheckAuth(token);
    console.log(user);
    setIsAuthorized(user.success);
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
      <ActivityBar activeBar={"logout"} />
      <Logout />
    </div>
  ) : (
    router.push("/auth")
  );
}

export default Page;
