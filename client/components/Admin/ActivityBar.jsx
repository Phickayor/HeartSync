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
import PageLoader from "@/loader/PageLoader";
function ActivityBar({ activeBar }) {
  const userContext = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { user } = await GetUser();
        userContext.userDispatch({ type: "signIn", payload: user });
      } catch (error) {
        router.push("/auth");
      }
    };
    fetchDetails();
  }, []);
  if (!userContext.userState) {
    return (
      <div className="w-screen h-screen fixed top-0 left-0 bg-white">
        <PageLoader />
      </div>
    );
  }
  return (
    <div className="bg-white text-[#131725] lg:h-full lg:flex flex-col justify-between lg:py-12 xl:py-24 py-1 px-3">
      <div className="grid grid-cols-5 lg:flex flex-col justify-around gap-6 ">
        <Link
          href="/admin/"
          className={
            activeBar == "home"
              ? "activityBar lg:text-white text-btnColor lg:bg-btnColor"
              : "activityBar"
          }
        >
          <AiOutlineHome className="text-2xl" />
        </Link>
        <Link
          href="/admin/search"
          className={
            activeBar == "search"
              ? "activityBar lg:text-white text-btnColor lg:bg-btnColor"
              : "activityBar"
          }
        >
          <AiOutlineSearch className="text-2xl" />
        </Link>
        <Link
          href="/admin/messaging"
          className={
            activeBar == "message"
              ? "activityBar lg:text-white text-btnColor lg:bg-btnColor"
              : "activityBar"
          }
        >
          <AiOutlineMessage className="text-2xl" />
        </Link>
        <Link
          href="/admin/settings"
          className={
            activeBar == "settings"
              ? "activityBar lg:text-white text-btnColor lg:bg-btnColor"
              : "activityBar"
          }
        >
          <AiOutlineSetting className="text-2xl" />
        </Link>
        <Link
          href="/admin/logout"
          className={
            activeBar == "logout"
              ? "activityBar lg:text-white text-btnColor lg:bg-btnColor"
              : "activityBar"
          }
        >
          <AiOutlineLogout className="text-2xl" />
        </Link>
      </div>

      <Link href="/admin/profile">
        <img
          src={userContext.userState?.profilePicture}
          className="hidden lg:block w-12 h-12 rounded-full border-2 border-btnColor object-cover  mx-auto self-center"
        />
      </Link>
    </div>
  );
}

export default ActivityBar;
