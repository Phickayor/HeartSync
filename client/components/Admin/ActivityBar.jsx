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
import Swal from "sweetalert2";
import Cookies from "js-cookie";
function ActivityBar({ activeBar }) {
  const userContext = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#F15A24",
      confirmButtonText: "Yes, Logout!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: " Logout Successful",
            icon: "success",
            timer: 2000
          }).then(() => {
            userContext.userDispatch("signOut");
            Cookies.set("token", "");
            router.push("/auth");
          });
        } catch (error) {
          if (error instanceof Error) {
            Swal.fire("Oops!", error.message, "error");
          } else {
            Swal.fire("Oops!", "An unknown error has occured", "error");
          }
        }
      }
    });
  };
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
    <div className="bg-[#0D0D0D] text-white lg:h-full lg:flex flex-col justify-between lg:py-12 py-1 px-2">
      <div className="grid grid-cols-5 lg:flex flex-col justify-around gap-4 ">
        <Link
          href="/admin/"
          className={
            activeBar == "home"
              ? "activityBar lg:text-white text-btnColor lg:bg-btnColor"
              : "activityBar"
          }
        >
          <AiOutlineHome className="text-xl" />
        </Link>
        <Link
          href="/admin/search"
          className={
            activeBar == "search"
              ? "activityBar lg:text-white text-btnColor lg:bg-btnColor"
              : "activityBar"
          }
        >
          <AiOutlineSearch className="text-xl" />
        </Link>
        <Link
          href="/admin/messaging"
          className={
            activeBar == "message"
              ? "activityBar lg:text-white text-btnColor lg:bg-btnColor"
              : "activityBar"
          }
        >
          <AiOutlineMessage className="text-xl" />
        </Link>
        <Link
          href="/admin/settings"
          className={
            activeBar == "settings"
              ? "activityBar lg:text-white text-btnColor lg:bg-btnColor"
              : "activityBar"
          }
        >
          <AiOutlineSetting className="text-xl" />
        </Link>
        <div
          onClick={handleLogout}
          className={
            activeBar == "logout"
              ? "activityBar cursor-pointer lg:text-white text-btnColor lg:bg-btnColor"
              : "activityBar cursor-pointer"
          }
        >
          <AiOutlineLogout className="text-xl" />
        </div>
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
