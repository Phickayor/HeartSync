import React from "react";
import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineMessage,
  AiOutlineSetting
} from "react-icons/ai";
import Link from "next/link";
function ActivityBar({ activeBar }) {
  return (
    <div className="bg-black w-fit h-full flex flex-col py-28 gap-6 px-2 text-white">
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
      <div className="self-center hover:bg-btnColor px-6 py-4 rounded-xl duration-300">
        <AiOutlineLogout className="text-2xl" />
      </div>
    </div>
  );
}

export default ActivityBar;
