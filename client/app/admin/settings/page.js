"use client";
import ActivityBar from "@/components/Admin/ActivityBar";
import AllSetings from "@/components/Admin/Settings/AllSetings";
import EditProfile from "@/components/Admin/Settings/EditProfile";
import { CheckAuth, GetAuth } from "@/components/Controllers/CheckAuth";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

function page() {
  const [name, setName] = useState(null);
  const [keyName, setKeyName] = useState("null");
  const [profileInfo, setProfileInfo] = useState({});
  const [authInfo, setAuthInfo] = useState({});
  const token = Cookies.get("token");
  const handleEdit = (name, key) => {
    setName(name);
    setKeyName(key);
  };
  useEffect(() => {
    const fetchDetails = async () => {
      var profile = await CheckAuth(token);
      setProfileInfo(profile);
      var auth = await GetAuth(token, profile.profile.auth);
      setAuthInfo(auth);
    };
    fetchDetails();
  }, []);
  return (
    <div className="fixed flex h-screen w-full">
      <ActivityBar activeBar={"settings"} />
      <AllSetings
        editHandler={handleEdit}
        profileInfo={profileInfo}
        authInfo={authInfo}
      />
      {name ? (
        <EditProfile name={name} keyName={keyName} editHandler={handleEdit} />
      ) : (
        <></>
      )}
    </div>
  );
}
export default page;
