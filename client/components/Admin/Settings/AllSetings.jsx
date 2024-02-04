"use client";
import React from "react";
function AllSetings(props) {
  const handleEdit = (name, key) => {
    props.editHandler(name, key);
  };
  return (
    <div className="bg-[#171717] w-full py-10 text-white flex">
      <div className="mx-auto w-10/12 self-center relative rounded-2xl bg-[#1E1D1D] pb-12 h-[85vh] overflow-y-auto">
        <div className="rounded-2xl sticky top-0 bg-[#232222] py-4 flex justify-center gap-5 text-sm text-center ">
          <div className="flex flex-col gap-2">
            <img src="/images/profile-1.png" alt="" className="w-20 h-20" />
            <span>Edit Profile</span>
          </div>
          <div className="flex flex-col gap-2">
            <img src="/images/profile-2.png" alt="" className="w-20 h-20" />
            <span>Edit Profile</span>
          </div>
          <div className="flex flex-col gap-2">
            <img src="/images/profile-3.png" alt="" className="w-20 h-20" />
            <span>Edit Profile</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-10 py-5 overflow-y-hidden ">
          <div className="border-b-2 border-[#EBEBEB] flex justify-between py-4">
            <div className="self-center">
              <h3>Username</h3>
              <span className="text-sm text-[#717171]">
                www.hibuddy/{props?.profileInfo?.profile?.userName}
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
              <span className="text-sm text-[#717171]">
                {props?.authInfo?.userAuth?.email}
              </span>
            </div>
            <span
              onClick={() => handleEdit("Email", "email")}
              className="text-sm font-semibold underline cursor-pointer"
            >
              Edit
            </span>
          </div>
          <div className="border-b-2 border-[#EBEBEB] flex justify-between py-4">
            <div className=" self-center">
              <h3>Phone number(s)</h3>
              <span className="text-sm text-[#717171]">
                +234 (0) {props?.profileInfo?.profile?.phoneNumber}
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
          <div className="border-b-2 border-[#EBEBEB] flex justify-between py-4">
            <div className=" self-center">
              <h3>Change preferences</h3>
              <span className="text-sm text-[#717171]">Not provided</span>
            </div>
            <span className="text-sm font-semibold underline cursor-pointer">
              Edit
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllSetings;
