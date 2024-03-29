"use client";
import React, { useContext, useEffect } from "react";
import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineMessage,
  AiOutlineSetting
} from "react-icons/ai";
import Link from "next/link";
import { UserContext } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { GetUser } from "../Controllers/UserController";
function ActivityBar({ activeBar }) {
  const userContext = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await GetUser();
      if (data.user) {
        userContext.userDispatch({ type: "signIn", payload: data.user });
      } else {
        router.push("/auth");
      }
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
          src={userContext.userState.user.profilePicture}
          className="w-12 h-12 rounded-full border-2 border-btnColor object-cover  mx-auto self-center"
        />
      </Link>
    </div>
  );
}

export default ActivityBar;
