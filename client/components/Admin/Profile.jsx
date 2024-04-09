"use client";
import { UserContext } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { GetSpecificUser } from "../Controllers/UserController";
import { capitalize } from "@/utilities/firstLetterCaps";
function Profile({ userId }) {
  const userContext = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const router = useRouter();
  const handleChat = (e) => {
    e.preventDefault();
    router.push(`/admin/messaging/${profile._id}`);
  };
  useEffect(() => {
    if (userId) {
      try {
        const fetchUserInfo = async () => {
          const { profile } = await GetSpecificUser(userId);
          profile ? setProfile(profile) : router.back();
        };
        fetchUserInfo();
      } catch (error) {
        console.log(error);
      }
    } else {
      setProfile(userContext.userState.user);
    }
  }, [userContext]);

  return (
    <div className="grid md:grid-rows-1 grid-rows-5 h-[calc(100vh-5rem)] py-10 md:h-screen max-h-screen gap-5 overflow-auto">
      <div className="md:hidden flex justify-center row-span-1 h-full">
        <img
          src="/images/logo.svg"
          alt=""
          className="self-center scale-150 h-fit"
        />
      </div>
      <div className="mx-auto row-span-4 py-2 flex flex-col gap-5 md:w-8/12 w-10/12">
        <img
          src={profile?.profilePicture}
          alt=""
          className="mx-auto w-32 h-32 rounded-full"
        />
        <h1 className="text-center font-semibold text-3xl md:text-4xl">
          {capitalize(profile?.userName)}
        </h1>
        <p className="text-center">{profile?.longBio}</p>
        <div className="mx-auto w-10/12 flex md:justify-center flex-wrap gap-3">
          {profile?.preferences?.map((preference) => (
            <div
              key={preference}
              className="py-3 md:py-5 bg-[#131725] rounded-full text-white md:px-8 px-5"
            >
              {preference}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 py-4">
          <button
            onClick={handleChat}
            className="bg-btnColor text-white mx-auto px-20 py-3 rounded-xl text-lg"
          >
            Chat
          </button>
          <span
            href="/admin/profile"
            className=" block text-center font-semibold underline cursor-pointer"
          >
            Share Profile
          </span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
