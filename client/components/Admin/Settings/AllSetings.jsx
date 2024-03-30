"use client";
import { UserContext } from "@/contexts/UserContext";
import Link from "next/link";
import React, { useContext, useState } from "react";
import EditProfile from "./EditProfile";
import { EditUser } from "@/components/Controllers/UserController";

function AllSetings() {
  const userContext = useContext(UserContext);
  const profile = userContext.userState.user;
  const [showAbovePageComponent, setShowAbovePageComponent] = useState(false);
  const [name, setName] = useState(null);
  const [keyName, setKeyName] = useState(null);
  const handleEdit = (name, keyName) => {
    setShowAbovePageComponent(true);
    setName(name);
    setKeyName(keyName);
  };
  const handleClose = () => {
    setShowAbovePageComponent(false);
  };
  const handleSubmit = async (e, keyName, value) => {
    e.preventDefault();
    const payload = {
      [keyName]: value
    };
    const data = await EditUser(payload);
    alert(data.message);
    handleClose();
    window.location.reload();
  };

  return (
    <div className="bg-[#171717] w-full h-full py-10 text-white flex">
      <div className="mx-auto w-10/12 self-center relative rounded-2xl bg-[#1E1D1D] pb-12 h-[85vh] overflow-y-auto">
        <div className="rounded-2xl sticky top-0 bg-[#232222] py-4 flex justify-center gap-5 text-sm text-center ">
          <div className="flex flex-col gap-2">
            <img
              src={profile.profilePicture}
              alt="dp"
              className="w-20 h-20 self-center object-cover rounded-full border-2 border-btnColor"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 px-10 py-5 overflow-y-hidden ">
          <div className="border-b-2 border-[#EBEBEB] flex justify-between py-4">
            <div className="self-center">
              <h3>Username</h3>
              <span className="text-sm text-[#717171]">
                www.hibuddy/{profile?.userName}
              </span>
            </div>
            <span
              onClick={() => handleEdit("Username", "userName")}
              className="text-sm font-semibold underline cursor-pointer"
            >
              Edit
            </span>
          </div>
          <div className="border-b-2 border-[#EBEBEB] flex justify-between py-4">
            <div className="self-center">
              <h3>Fullname</h3>
              <span className="text-sm text-[#717171]">
                {profile?.fullName}
              </span>
            </div>
            <span
              onClick={() => handleEdit("Username", "userName")}
              className="text-sm font-semibold underline cursor-pointer"
            >
              Edit
            </span>
          </div>
          <div className="border-b-2 border-[#EBEBEB] flex justify-between py-4">
            <div className=" self-center">
              <h3>Email address</h3>
              <span className="text-sm text-[#717171]">{profile.email}</span>
            </div>
          </div>
          <div className="border-b-2 border-[#EBEBEB] flex justify-between py-4">
            <div className=" self-center">
              <h3>Phone number</h3>
              <span className="text-sm text-[#717171]">
                {profile?.phoneNumber
                  ? "+234 (0) " + profile.phoneNumber
                  : "Not Provided"}
              </span>
            </div>
            <span
              onClick={() => handleEdit("Phone Number", "phoneNumber")}
              className="text-sm font-semibold underline cursor-pointer"
            >
              Edit
            </span>
          </div>
          <div className="border-b-2 border-[#EBEBEB] flex justify-between py-4">
            <div className=" self-center">
              <h3>Change preferences</h3>
              <span className="text-sm text-[#717171]">
                {profile.preferences
                  ? profile.preferences.join(", ")
                  : "Not Provided"}
              </span>
            </div>
            <Link
              href="/admin/settings/edit-preference"
              className="text-sm font-semibold underline cursor-pointer"
            >
              Edit
            </Link>
          </div>
          <div className="border-b-2 border-[#EBEBEB] flex justify-between py-4">
            <div className=" self-center">
              <h3>Password</h3>
              <span className="text-sm text-[#717171]">*****************</span>
            </div>
            <span
              onClick={() => handleEdit("Password", "password")}
              className="text-sm font-semibold underline cursor-pointer"
            >
              Edit
            </span>
          </div>
        </div>
        {showAbovePageComponent && (
          <EditProfile
            onClose={handleClose}
            name={name}
            keyName={keyName}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default AllSetings;
