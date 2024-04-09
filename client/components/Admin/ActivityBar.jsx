"use client";
import React, { useContext, useEffect } from "react";
import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineMessage,
  AiOutlineSearch,
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
    <div className="bg-white text-[#131725] md:h-full md:flex flex-col justify-between md:py-24 py-1 px-3">
      <div className="flex md:flex-col justify-around gap-6 ">
        <Link
          href="/admin/"
          className={
            activeBar == "home"
              ? "activityBar text-white bg-btnColor"
              : "activityBar"
          }
        >
          <AiOutlineHome className="text-2xl" />
        </Link>
        <Link
          href="/admin/search"
          className={
            activeBar == "search"
              ? "activityBar text-white bg-btnColor"
              : "activityBar"
          }
        >
          <AiOutlineSearch className="text-2xl" />
        </Link>
        <Link
          href="/admin/messaging"
          className={
            activeBar == "message"
              ? "activityBar md:text-white text-btnColor md:bg-btnColor"
              : "activityBar"
          }
        >
          <AiOutlineMessage className="text-2xl" />
        </Link>
        <Link
          href="/admin/settings"
          className={
            activeBar == "settings"
              ? "activityBar text-white bg-btnColor"
              : "activityBar"
          }
        >
          <AiOutlineSetting className="text-2xl" />
        </Link>
        <Link
          href="/admin/logout"
          className={
            activeBar == "logout"
              ? "activityBar text-white bg-btnColor"
              : "activityBar"
          }
        >
          <AiOutlineLogout className="text-2xl" />
        </Link>
      </div>

      <Link href="/admin/profile">
        <img
          src={userContext.userState.user.profilePicture}
          className="hidden md:block w-12 h-12 rounded-full border-2 border-btnColor object-cover  mx-auto self-center"
        />
      </Link>
    </div>
  );
}

export default ActivityBar;
