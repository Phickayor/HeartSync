import React, { useEffect, useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineMessage,
  AiOutlineSetting
} from "react-icons/ai";
import Link from "next/link";
import { CheckAuth } from "../Controllers/CheckAuth";
import Cookies from "js-cookie";
function ActivityBar({ activeBar }) {
  const token = Cookies.get("token");
  const [profileInfo, setProfileInfo] = useState({});
  useEffect(() => {
    const fetchDetails = async () => {
      var user = await CheckAuth(token);
      setProfileInfo(user);
      console.log(user);
    };
    fetchDetails();
  }, []);
  return (
    <div className="bg-black w-fit h-full flex flex-col justify-between py-24 px-2 text-white">
      <div className="flex flex-col gap-6 ">
        <Link
          href="/admin/"
          className={
            activeBar == "home" ? "activityBar bg-btnColor" : "activityBar"
          }
        >
          <AiOutlineHome className="text-2xl" />
        </Link>
        <Link
          href="/admin/messaging"
          className={
            activeBar == "message" ? "activityBar bg-btnColor" : "activityBar"
          }
        >
          <AiOutlineMessage className="text-2xl" />
        </Link>
        <Link
          href="/admin/settings"
          className={
            activeBar == "settings" ? "activityBar bg-btnColor" : "activityBar"
          }
        >
          <AiOutlineSetting className="text-2xl" />
        </Link>
        <Link
          href="/admin/logout"
          className={
            activeBar == "logout" ? "activityBar bg-btnColor" : "activityBar"
          }
        >
          <AiOutlineLogout className="text-2xl" />
        </Link>
      </div>

      <Link href="/admin/profile">
        <img
          src={profileInfo?.profile?.pictures[0]}
          className="w-12 h-12 rounded-full border-2 border-btnColor object-cover  mx-auto self-center"
        />
      </Link>
    </div>
  );
}

export default ActivityBar;
