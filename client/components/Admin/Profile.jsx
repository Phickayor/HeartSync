"use client";
import { UserContext } from "@/contexts/UserContext";
import React, { useContext } from "react";
function Profile() {
  const userContext = useContext(UserContext);
  const profile = userContext.userState.user;
  return (
    <div className="md:py-16 p-5 h-screen ">
      <div className="flex gap-5 md:w-fit">
        <img
          src={profile.profilePicture}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full"
        />
        <div className="flex flex-col gap-2 md:gap-4 w-9/12">
          <div className="flex gap-5">
            <h1 className="text-lg md:text-2xl">{profile.userName}</h1>
            <button className="bg-[#131725] text-white rounded-full px-4 py-2 md:text-md text-xs">
              Chat with
            </button>
            <button className="bg-[#131725] text-white rounded-full px-4 py-2 md:text-md text-xs">
              Share profile
            </button>
          </div>
          <div className="flex justify-between md:text-lg font-medium">
            <span>10 Likes</span>
            <span>20 Friends</span>
            <span>40 Rejected</span>
          </div>
          <span>{profile.longBio}</span>
        </div>
      </div>
      <div>
        {profile?.preferences?.map((preference)=>{
          <span>{preference}</span>
        })}
      </div>
    </div>
  );
}

export default Profile;
