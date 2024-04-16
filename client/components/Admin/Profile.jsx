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
    router.push(`/admin/messaging/?userId=${profile._id}`);
  };
  const handleShareClick = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${capitalize(profile.userName)}'s Big Circle Profile`,
          text: `Get to meet ${profile.userName} on Big Circle `,
          url: `www.hibuddydev.netlify.app/profile/${profile._id}`
        });
        console.log("Successfully shared");
      } else {
        // console.log("Web Share API not supported");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
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
      setProfile(userContext.userState);
    }
  }, [userContext]);
  if (!profile) {
    return;
  }
  return (
    <div className="grid lg:grid-rows-1 grid-rows-5 h-[calc(100vh-5rem)] py-10 lg:h-screen max-h-screen gap-5 overflow-auto">
      <div className="lg:hidden flex justify-center row-span-1 h-full">
        <img
          src="/images/logo.svg"
          alt=""
          className="self-center md:scale-150"
        />
      </div>
      <div className="mx-auto row-span-4 py-2 flex flex-col gap-5 lg:w-8/12 w-10/12">
        <img
          src={profile?.profilePicture}
          alt=""
          className="mx-auto w-32 h-32 rounded-full"
        />
        <h1 className="text-center font-semibold text-3xl lg:text-4xl">
          {capitalize(profile?.userName)}
        </h1>
        <p className="text-center">{profile?.longBio}</p>
        <div className="mx-auto lg:w-10/12 flex justify-center flex-wrap gap-3">
          {profile?.preferences?.map((preference) => (
            <div
              key={preference}
              className="py-3 lg:py-5 bg-[#131725] rounded-full text-white lg:px-8 px-5"
            >
              {preference}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 py-4">
          {userId && (
            <button
              onClick={handleChat}
              className="auth-btn" >
              Chat
            </button>
          )}
          <span
            onClick={handleShareClick}
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
