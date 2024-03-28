"use client";
import ActivityBar from "@/components/Admin/ActivityBar";
import AllSetings from "@/components/Admin/Settings/AllSetings";
import EditProfile from "@/components/Admin/Settings/EditProfile";
import { CheckAuth, GetAuth } from "@/components/Controllers/CheckAuth";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const [name, setName] = useState(null);
  const [keyName, setKeyName] = useState(null);
  const [userId, setUserId] = useState("");
  const [authInfo, setAuthInfo] = useState({});
  const router = useRouter();
  const token = Cookies.get("token");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authorizationChecked, setAuthorizationChecked] = useState(false);
  const handleEdit = (name, key) => {
    setName(name);
    setKeyName(key);
  };
  const CheckAuthorization = async () => {
    var user = await CheckAuth(token);
    setIsAuthorized(user.success);
    setAuthorizationChecked(true);
    setUserId(user.profile._id);
    var auth = await GetAuth(token, user.profile.auth);
    setAuthInfo(auth);
  };
  useEffect(() => {
    CheckAuthorization();
  }, []);
  if (!authorizationChecked) {
    return (
      <div className="fixed flex h-screen w-full">
        <ActivityBar activeBar={"settings"} />
      </div>
    );
  }
  return isAuthorized ? (
    <div className="fixed flex h-screen w-full">
      <ActivityBar activeBar={"settings"} />
      <AllSetings
        editHandler={handleEdit}
        userId={userId}
        authInfo={authInfo}
      />
      {name ? (
        <EditProfile name={name} keyName={keyName} editHandler={handleEdit} />
      ) : (
        <></>
      )}
    </div>
  ) : (
    router.push("/auth")
  );
}

export default Page;
