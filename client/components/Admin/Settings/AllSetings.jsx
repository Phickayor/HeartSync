"use client"
import { UserContext } from "@/contexts/UserContext";
import Link from "next/link";
import React, { useContext, useRef, useState } from "react";
import EditProfile from "./EditProfile";
import { EditUser } from "@/components/Controllers/UserController";
import Cookies from "js-cookie";
// Import CustomPopup
import PopupModal from "@/components/Auth/Registration/popup";
import { FaCamera } from "react-icons/fa";

function AllSettings() {
  const userContext = useContext(UserContext);
  const profile = userContext.userState;
  const [showAbovePageComponent, setShowAbovePageComponent] = useState(false);
  const [name, setName] = useState(null);
  const [keyName, setKeyName] = useState(null);
  const [popup, setPopup] = useState({ show: false, message: "" }); // State for custom popup without type
  const profilePic = useRef(null);

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
    const token = Cookies.get("token");
    const data = await EditUser(payload, token);

    // Set the popup message depending on success or error
    setPopup({
      show: true,
      message: data.success ? data.message || "Update successful!" : data.message || "An error occurred!"
    });

    handleClose();
    window.location.reload(); // Optionally reload the page after a successful update
  };

  const handleProfilePicUpdate = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        handleSubmit(e, "profilePicture", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full lg:h-full overflow-auto h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] lg:max-h-screen flex lg:py-10 ">
      <div className="mx-auto pb-6 lg:py-0 w-full md:w-10/12 lg:w-8/12 relative bg-[#1E1D1D] rounded-2xl overflow-auto">
        <div className="group rounded-xl flex py-4 flex-col sticky top-0 bg-[#232222] backdrop-blur gap-2">
          <div className="relative self-center">
            <img
              src={profile?.profilePicture}
              alt="dp"
              className="group-hover:opacity-40 w-24 h-24 self-center object-cover rounded-full border-2 border-btnColor"
            />
            <div className="absolute top-0 hidden group-hover:flex flex-col w-full h-full justify-center">
              <div className="w-24 h-24 flex justify-center self-center">
                <span
                  className="cursor-pointer self-center text-2xl text-white"
                  onClick={() => profilePic.current.click()}
                >
                  <FaCamera />
                </span>
                <input
                  type="file"
                  onChange={handleProfilePicUpdate}
                  className="hidden"
                  ref={profilePic}
                />
              </div>
            </div>
          </div>

          <Link
            href="/admin/profile"
            className="lg:hidden block text-sm text-center font-semibold underline cursor-pointer"
          >
            View Profile
          </Link>
        </div>
        <div className="flex flex-col gap-2 px-4 lg:px-10 py-5 overflow-y-auto ">
          <div className="border-b-2 border-[#EBEBEB] flex justify-between py-2 lg:py-3">
            <div className="self-center">
              <h3 className="lg:text-lg">Username</h3>
              <span className="lg:text-md text-sm text-[#717171]">
                www.hibuddy/{profile?.userName}
              </span>
            </div>
            <span
              onClick={() => handleEdit("Username", "userName")}
              onKeyDown={(event) =>
                event.key == "Enter" && handleEdit("Username", "userName")
              }
              className="text-sm font-semibold underline cursor-pointer"
            >
              Edit
            </span>
          </div>

          {/* Full Name Section */}
          <div className="border-b-2 border-[#EBEBEB] flex justify-between py-2 lg:py-3">
            <div className="self-center">
              <h3 className="lg:text-lg">Full Name</h3>
              <span className="lg:text-md text-sm text-[#717171]">
                {profile?.fullName}
              </span>
            </div>
            <span
              onClick={() => handleEdit("Full Name", "fullName")}
              onKeyDown={(event) =>
                event.key == "Enter" && handleEdit("Full Name", "fullName")
              }
              className="text-sm font-semibold underline cursor-pointer"
            >
              Edit
            </span>
          </div>

          {/* Email Section */}
          <div className="border-b-2 border-[#EBEBEB] flex justify-between py-2 lg:py-3">
            <div className="self-center">
              <h3 className="lg:text-lg">Email</h3>
              <span className="lg:text-md text-sm text-[#717171]">
                {profile?.email}
              </span>
            </div>
            <span
              onClick={() => handleEdit("Email", "email")}
              onKeyDown={(event) =>
                event.key == "Enter" && handleEdit("Email", "email")
              }
              className="text-sm font-semibold underline cursor-pointer"
            >
              Edit
            </span>
          </div>

          <div className="border-b-2 border-[#EBEBEB] flex justify-between py-2 lg:py-3">
            <div className="self-center">
              <h3 className="lg:text-lg">Long Bio</h3>
              <span className="lg:text-md text-sm text-[#717171]">
                {profile?.longBio}
              </span>
            </div>
            <span
              onClick={() => handleEdit("Long Bio", "longBio")}
              onKeyDown={(event) =>
                event.key == "Enter" && handleEdit("Long Bio", "longBio")
              }
              className="text-sm font-semibold underline cursor-pointer"
            >
              Edit
            </span>
          </div>
          <div className="border-b-2 border-[#EBEBEB] flex justify-between py-2 lg:py-3">
            <div className=" self-center">
              <h3 className="lg:text-lg">Phone number</h3>
              <span className="lg:text-md text-sm text-[#717171]">
                {profile?.phoneNumber
                  ? "+234 (0) " + profile.phoneNumber
                  : "Not Provided"}
              </span>
            </div>
            <span
              onClick={() => handleEdit("Phone Number", "phoneNumber")}
              onKeyDown={(event) =>
                event.key == "Enter" &&
                handleEdit("Phone Number", "phoneNumber")
              }
              className="text-sm font-semibold underline cursor-pointer"
            >
              Edit
            </span>
          </div>
          <div className="border-b-2 border-[#EBEBEB] flex justify-between py-2 lg:py-3">
            <div className=" self-center">
              <h3 className="lg:text-lg">Edit Card Preview</h3>
            </div>
            <Link
              href="/admin/settings/edit-profile-card"
              className="text-sm font-semibold underline cursor-pointer"
            >
              Edit
            </Link>
          </div>
          <div className="border-b-2 border-[#EBEBEB] flex justify-between py-2 lg:py-3">
            <div className=" self-center">
              <h3 className="lg:text-lg">Change preferences</h3>
              <span className="lg:text-md text-sm text-[#717171]">
                {profile?.preferences
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
          <div className="border-b-2 border-[#EBEBEB] flex justify-between py-2 lg:py-3">
            <div className=" self-center">
              <h3 className="lg:text-lg">Password</h3>
              <span className="lg:text-md text-sm text-[#717171]">
                *****************
              </span>
            </div>
            <span
              onClick={() => handleEdit("Password", "password")}
              onKeyDown={(event) =>
                event.key == "Enter" && handleEdit("Password", "password")
              }
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

      {/* Display the custom popup */}
      {popup.show && (
        <PopupModal
          message={popup.message}
          onClose={() => setPopup({ show: false, message: "" })}
        />
      )}
    </div>
  );
}

export default AllSettings;
