"use client";
import React, { useContext, useRef, useState } from "react";
import ButtonLoader from "../../Loaders/ButtonLoader";
import { AiFillInfoCircle, AiOutlineCamera } from "react-icons/ai";
import { RegContext } from "@/contexts/RegContext";
function ProfileSection({ onNext }) {
  const pic = useRef(null);
  const [image, setImage] = useState(null);
  const [longBio, setLongBio] = useState("");
  const [loader, setLoader] = useState(false);
  const regContext = useContext(RegContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const handleImageDisplay = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };    
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      if (image) {
        const payload = { profilePicture: image, longBio };
        regContext.RegDispatch({ type: "update", payload });
        onNext();
      } else {
        setErrorMessage("Kindly upload profile picture ");
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoader(false);
  };
  return (
    <div className="">
      <img src="/images/logo.svg" className="mx-auto lg:hidden " alt="" />
      <div className="p-5 px-10 rounded-xl">
        <div className="text-center space-y-3 py-5">
          <h1 className="auth-header">Profile Section</h1>
          <p className="font-extralight text-sm">
            All details here would show on your public feed
          </p>
        </div>
        {errorMessage ? (
          <div className="flex justify-center gap-2 py-5 [&>*]:self-center">
            <AiFillInfoCircle />
            <span className="text-center text-red-500">{errorMessage}</span>
          </div>
        ) : (
          <></>
        )}
        <div className="flex mx-auto w-fit gap-2 md:gap-5 [&>*]:self-center [&>*]:cursor-pointer">
          <div className="cursor-pointer group relative">
            <img
              src={image || "/images/profile-2.png"}
              className="border-2 border-purple-500 rounded-full w-24 h-24 self-center object-cover group-hover:opacity-60"
            />
            <div className="hidden absolute top-0 group-hover:flex justify-center w-full h-full">
              <AiOutlineCamera
                onClick={() => {
                  pic.current.click();
                }}
                className="self-center text-3xl text-white"
              />

              <input
                type="file"
                name="profilePicture"
                onChange={handleImageDisplay}
                alt=""
                ref={pic}
                className="hidden"
              />
            </div>
          </div>
        </div>
        <form
          className="flex flex-col gap-5 py-5 mx-auto md:w-7/12"
          onSubmit={HandleSubmit}
        >
          <input
            onChange={(e) => {
              setLongBio(e.target.value);
            }}
            value={longBio}
            required
            className="bg-inherit border py-2 px-4 focus:outline-none focus:border-dashed rounded-md w-full"
            placeholder="Add a short bio about yourself"
          />
          <button type="submit" className="auth-btn">
            {loader ? <ButtonLoader /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileSection;
