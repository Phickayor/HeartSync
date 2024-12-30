"use client";
import React, { useContext, useRef, useState } from "react";
import ButtonLoader from "../../Loaders/ButtonLoader";
import { AiFillInfoCircle, AiOutlineCamera } from "react-icons/ai";
import { RegContext } from "@/contexts/RegContext";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
function ProfileSection({ onNext, onPrev }) {
  const regContext = useContext(RegContext);
  const pic = useRef(null);
  const [image, setImage] = useState(
    regContext?.RegState?.profilePicture || null
  );
  const [longBio, setLongBio] = useState(regContext?.RegState?.longBio || "");
  const [loader, setLoader] = useState(false);
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
  const handleNext = () => {
    if (!image || !longBio) {
      return setErrorMessage("Kindly fill all fields before proceeding");
    }
    onNext();
  };
  return (
    <div className="flex flex-col justify-center rounded-xl mx-auto bg-[#1B1B1B]">
      <div className="p-5 px-10 rounded-xl">
        <div className="flex justify-between">
          <FaAngleLeft
            className="text-3xl font-extralight cursor-pointer"
            onClick={() => onPrev()}
          />
          <FaAngleRight
            className="text-3xl font-extralight cursor-pointer"
            onClick={handleNext}
          />
        </div>
        {errorMessage ? (
          <div className="flex justify-center gap-2 py-5 [&>*]:self-center">
            <AiFillInfoCircle />
            <span className="text-center text-red-500">{errorMessage}</span>
          </div>
        ) : (
          <></>
        )}
        <div className="flex justify-between gap-5">
          <div className="space-y-2 py-5">
            <h1 className=" text-2xl md:text-3xl xl:text-4xl font-medium">
              Profile Section
            </h1>
            <p className="font-extralight text-sm w-9/12">
              All details here would show on your public feed
            </p>
          </div>
          <div className="flex mx-auto w-fit gap-2 md:gap-5 [&>*]:self-center [&>*]:cursor-pointer">
            <div className="cursor-pointer group relative">
              {image && (
                <img
                  src={image}
                  className="border-2 border-btnColor rounded-full w-24 h-24 self-center object-cover group-hover:opacity-60"
                />
              )}
              {!image && (
                <div className="border-2 border-btnColor rounded-full size-20 flex flex-col justify-center place-content-center group-hover:opacity-0">
                  <img
                    src="/images/camera.png"
                    className="rounded-full size-10 self-center object-contain"
                  />
                </div>
              )}
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
        </div>
        <form
          className="flex flex-col gap-5 py-5 mx-auto"
          onSubmit={HandleSubmit}
        >
          <input
            className="py-4 rounded-lg font-light bg-[#202020] px-5 focus:outline-none"
            type="text"
            onChange={(e) => {
              setLongBio(e.target.value);
            }}
            value={longBio}
            required
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
