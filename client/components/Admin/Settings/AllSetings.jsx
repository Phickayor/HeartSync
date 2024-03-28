"use client";
import {
  GetAllPics,
  UpdateSinglePicture
} from "@/components/Controllers/PicturesController";
import { GetProfile } from "@/components/Controllers/ProfileController";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
function AllSetings(props) {
  const pic1 = useRef(null);
  const pic2 = useRef(null);
  const pic3 = useRef(null);
  const token = Cookies.get("token");
  const [pictures, setPictures] = useState([]);
  const [profile, SetProfile] = useState(null);

  const handleEdit = async (name, key) => {
    props.editHandler(name, key);
    getDetails();
  };
  const handleImageUpdate = (currentPicNumber) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async function (e) {
        let payload = {
          picture: e.target.result
        };
        switch (currentPicNumber) {
          case "pic1":
            await UpdateSinglePicture(profile.pictures, 1, payload);
            break;
          case "pic2":
            await UpdateSinglePicture(profile.pictures, 2, payload);
            break;
          case "pic3":
            await UpdateSinglePicture(profile.pictures, 3, payload);
            break;
          default:
            console.log("No case found");
        }
        getDetails();
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageSelection = (picNumber) => {
    switch (picNumber) {
      case "pic1":
        pic1.current.click();
        break;
      case "pic2":
        pic2.current.click();
        break;
      case "pic3":
        pic3.current.click();
        break;
      default:
        console.log("No pic selected");
    }
  };
  const handleImageUpdateForPic1 = handleImageUpdate("pic1");
  const handleImageUpdateForPic2 = handleImageUpdate("pic2");
  const handleImageUpdateForPic3 = handleImageUpdate("pic3");

  const setupPictures = async (pictureId) => {
    var { pictures } = await GetAllPics(pictureId);
    setPictures([pictures?.pic1, pictures?.pic2, pictures?.pic3]);
  };

  const getDetails = async () => {
    var details = await GetProfile(props.userId);
    console.log(details);
    SetProfile(details.profile);
    setupPictures(details?.profile?.pictures);
  };
  useEffect(() => {
    getDetails();
    setupPictures();
  }, []);

  return (
    <div className="bg-[#171717] w-full py-10 text-white flex">
      <div className="mx-auto w-10/12 self-center relative rounded-2xl bg-[#1E1D1D] pb-12 h-[85vh] overflow-y-auto">
        <div className="rounded-2xl sticky top-0 bg-[#232222] py-4 flex justify-center gap-5 text-sm text-center ">
          <div className="flex flex-col gap-2">
            <img
              src={pictures[0]}
              alt=""
              className="w-20 h-20 self-center object-cover rounded-full border-2 border-btnColor"
            />
            <span
              onClick={() => handleImageSelection("pic1")}
              className="cursor-pointer underline"
            >
              Edit Profile
            </span>
            <input
              type="file"
              name="pic1"
              onChange={handleImageUpdateForPic1}
              alt=""
              ref={pic1}
              className="hidden"
            />
          </div>{" "}
          <div className="flex flex-col gap-2">
            <img
              src={pictures[1]}
              alt=""
              className="w-20 h-20 self-center object-cover rounded-full border-2 border-btnColor"
            />
            <span
              onClick={() => handleImageSelection("pic2")}
              className="cursor-pointer underline"
            >
              Edit Profile
            </span>
            <input
              type="file"
              name="pic2"
              onChange={handleImageUpdateForPic2}
              alt=""
              ref={pic2}
              className="hidden"
            />
          </div>{" "}
          <div className="flex flex-col gap-2">
            <img
              src={pictures[2]}
              alt=""
              className="w-20 h-20 self-center object-cover rounded-full border-2 border-btnColor"
            />
            <span
              onClick={() => handleImageSelection("pic3")}
              className="cursor-pointer underline"
            >
              Edit Profile
            </span>
            <input
              type="file"
              name="pic3"
              onChange={handleImageUpdateForPic3}
              alt=""
              ref={pic3}
              className="hidden"
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
              <span className="text-sm text-[#717171]">
                {profile?.preferences
                  ? profile.preferences.join(", ")
                  : "Not Provided"}
              </span>
            </div>
            <Link
              href="/profile/preferences"
              className="text-sm font-semibold underline cursor-pointer"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllSetings;
