"use client";
import React, { useContext, useState } from "react";
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
import Cookies from "js-cookie";

function ActivityBar({ activeBar }) {
  const userContext = useContext(UserContext);
  const router = useRouter();

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogout = () => {
    // Show confirmation modal instead of window.confirm
    setIsErrorModalOpen(true);
    setErrorMessage("Are you sure you want to log out? This action cannot be undone.");
  };

  const confirmLogout = () => {
    try {
      userContext.userDispatch({ type: "signOut" });
      Cookies.remove("token");
      router.push("/auth");
      setIsErrorModalOpen(false); // Close the modal after logout
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error has occurred");
      }
    }
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <div className="bg-[#0D0D0D] text-white lg:h-full lg:flex h-[3.5rem] flex-col justify-between lg:py-12 py-1 px-2">
      <div className="grid grid-cols-5 lg:flex flex-col lg:flex-initial flex-1 h-full lg:h-fit justify-around gap-4 ">
        <Link
          href="/admin/"
          className={
            activeBar === "home"
              ? "activityBar lg:text-white text-btnColor lg:bg-btnColor"
              : "activityBar"
          }
        >
          <AiOutlineHome className="text-xl" />
        </Link>
        <Link
          href="/admin/search"
          className={
            activeBar === "search"
              ? "activityBar lg:text-white text-btnColor lg:bg-btnColor"
              : "activityBar"
          }
        >
          <AiOutlineSearch className="text-xl" />
        </Link>
        <Link
          href="/admin/messaging"
          className={
            activeBar === "message"
              ? "activityBar lg:text-white text-btnColor lg:bg-btnColor"
              : "activityBar"
          }
        >
          <AiOutlineMessage className="text-xl" />
        </Link>
        <Link
          href="/admin/settings"
          className={
            activeBar === "settings"
              ? "activityBar lg:text-white text-btnColor lg:bg-btnColor"
              : "activityBar"
          }
        >
          <AiOutlineSetting className="text-xl" />
        </Link>
        <div
          onClick={handleLogout}
          className={
            activeBar === "logout"
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
          className="hidden lg:block size-12 rounded-full border-2 border-btnColor object-cover  mx-auto self-center"
        />
      </Link>

      {/* Error Confirmation Modal */}
      {isErrorModalOpen && (
         <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 w-full">
         <div className="bg-[#202020] p-8 rounded-lg flex flex-col items-center gap-1 w-fit">
            <h2 className=" flex text-2xl font-extrabold text-white mb-6">Confirmation</h2>
            <p className="flex text-lg text-white font-semibold">{errorMessage}</p>
            <div className="flex items-center justify-between mt-3 gap-20">
              <button
                onClick={confirmLogout}
                className="px-6 py-3 bg-[#FF8A60] text-white font-bold rounded-lg hover:bg-red-500 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={closeErrorModal}
                className="px-6 py-3 bg-[#444444] text-white font-bold rounded-lg hover:bg-gray-800 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivityBar;
