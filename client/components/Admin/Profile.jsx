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
          url: `https://hibuddydev.netlify.app/profile/${profile._id}`
        });
        console.log("Successfully shared");
      } else {
        console.log("Web Share API not supported");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  useEffect(() => {
    if (userId) {
      const fetchUserInfo = async () => {
        try {
          const { profile } = await GetSpecificUser(userId);
          profile ? setProfile(profile) : router.back();
        } catch (error) {
          console.log(error);
        }
      };
      fetchUserInfo();
    } else {
      setProfile(userContext.userState);
    }
  }, [userContext]);
  if (!profile) {
    return;
  }
  return (
    <div className="grid lg:grid-rows-1 grid-rows-5 h-[calc(100vh-5rem)] py-10 lg:h-screen gap-5 overflow-auto">
      <div className="mx-auto row-span-4 py-2 flex flex-col md:justify-center gap-5 lg:w-8/12 w-10/12">
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
          <div className="py-3 lg:py-5 bg-[#131725] rounded-full text-white lg:px-8 px-5">
            {profile.weight}
          </div>
          <div className="py-3 lg:py-5 bg-[#131725] rounded-full text-white lg:px-8 px-5">
            {profile.height}
          </div>
          <div className="py-3 lg:py-5 bg-[#131725] rounded-full text-white lg:px-8 px-5">
            {profile.gender}
          </div>
          {profile?.preferences?.map((preference) => {
            if (["Male", "Female", "Male & Female"].includes(preference)) {
              return;
            } else {
              return (
                <div
                  key={preference}
                  className="py-3 lg:py-5 bg-[#131725] rounded-full text-white lg:px-8 px-5"
                >
                  {preference}
                </div>
              );
            }
          })}
        </div>
        <div className="flex flex-col gap-2 py-4">
          {userId && (
            <button onClick={handleChat} className="auth-btn">
              Chat
            </button>
          )}
          <button
            onClick={handleShareClick}
            className=" block text-center font-semibold underline cursor-pointer"
          >
            Share Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
