"use client";
import { RegContext } from "@/contexts/RegContext";
import React, { useContext, useRef, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import Swal from "sweetalert2";
function CardPreview({ onNext }) {
  const regContext = useContext(RegContext);
  const [userName, setUserName] = useState(regContext.RegState.userName);
  const [shortBio, setShortBio] = useState("");
  const pic = useRef(null);
  const [displayPicture, setDisplayPicture] = useState(
    "/images/displayPic.png"
  );

  const handleImageDisplay = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setDisplayPicture(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (displayPicture !== "/images/displayPic.png") {
      const payload = {
        displayPicture,
        userName,
        shortBio
      };
      regContext.RegDispatch({ type: "update", payload });
      onNext();
    } else {
      Swal.fire({ text: "Kindly add a Display Picture to proceed" });
    }
  };
  return (
    <div className="flex flex-col justify-center h-screen py-6 gap-8">
      <h1 className="text-2xl md:text-3xl text-center font-medium">
        Profile Card Preview
      </h1>
      <div className="group rounded-3xl mx-auto w-[22rem] h-[36rem] bg-[#1E1D1D] relative p-2">
        <img
          src={displayPicture}
          className="self-center rounded-3xl top-0 left-0 absolute object-cover group-hover:opacity-40 w-full h-full"
          alt="Display picture"
        />
        <div className="absolute text-white space-y-3 left-0 mx-auto w-full bottom-0">
          <div className="hidden py-20 group-hover:flex justify-center w-full h-full">
            <AiOutlineCamera
              onClick={() => {
                pic.current.click();
              }}
              className="self-center cursor-pointer text-5xl text-white"
            />

            <input
              type="file"
              name="displayPicture"
              onChange={handleImageDisplay}
              alt=""
              ref={pic}
              className="hidden"
            />
          </div>
          <div className="bg-[#1E1D1D] font-light text-center rounded-3xl py-4 flex flex-col justify-between gap-5">
            <input
              type="text"
              required
              className="text-center text-2xl bg-inherit focus:outline-none"
              value={userName}
              minLength={3}
              maxLength={10}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="Username"
            />
            <input
              type="text"
              className="text-center md:text-lg bg-inherit focus:outline-none"
              required
              value={shortBio}
              onChange={(e) => {
                setShortBio(e.target.value);
              }}
              minLength={7}
              maxLength={30}
              placeholder="Short bio here..."
            />
            <button
              disabled
              className="bg-btnColor px-14 rounded-xl py-2.5 mx-auto"
            >
              Let's chat
            </button>
            <span
              onClick={handleSubmit}
              className="block cursor-pointer underline"
            >
              Save profile card
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPreview;
