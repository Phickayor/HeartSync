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
    <div className="grid h-[calc(100vh-3.5rem)] py-10 lg:min-h-screen gap-5 overflow-auto">
      <div className="mx-auto py-2 flex flex-col md:justify-center gap-5 lg:w-8/12 w-11/12 overflow-auto h-fit">
        <img
          src={profile?.profilePicture}
          alt=""
          className="mx-auto size-32 object-cover rounded-full"
        />
        <h1 className="inline-flex justify-center gap-2 text-center font-semibold text-3xl lg:text-4xl self-center ">
          {capitalize(profile?.userName)}
          {profile.school && (
            <span className="font-extralight text-sm text-[#A7A7A7] self-end pb-1">
              ({capitalize(profile?.school)})
            </span>
          )}
        </h1>
        <p className="text-center">{profile?.longBio}</p>

        <div className="mx-auto lg:w-10/12 flex justify-center flex-wrap gap-3 lg:gap-5">
          <div className="py-3  bg-[#202020] rounded-full text-white lg:px-8 px-5">
            {profile.gender}
          </div>
          {profile?.preferences?.map((preference) => {
            if (["Male", "Female", "Male & Female"].includes(preference)) {
              return;
            } else {
              return (
                <div
                  key={preference}
                  className="py-3  bg-[#202020] rounded-full text-white lg:px-8 px-5"
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
              Send a message
            </button>
          )}
          <button
            onClick={handleShareClick}
            className=" block text-center font-semibold underline cursor-pointer py-4"
          >
            Share Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
